// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});
intent('Good morning', p => {
    p.play('(Good morning|morning)');
});
intent('Write message to all logs',p=>{
    p.play({command:"writeMessage"})
    p.play('Sure, done')
})
intent('Go back',p=>{
    p.play({command:"goBack"})
    p.play('Going back')
})
intent('Check for weather',p=>{
    p.play({command:"weather"})
    p.play('Checking for weather')
})

// intent('Search for Tesla',p=>{
//     p.play({command:"Tesla"})
//     p.play('Searching for tesla')
// })


intent('Search for $(SEARCH* .+)',async p=>{
    p.play({command:"search",name:p.SEARCH.value})
    p.play(`${p.SEARCH.value}`)
})
const userInput = context(() => {
    intent("$(I* .+)", p => p.resolve(p.I));
})
onVisualState((p)=>{
    console.log("visual data",p.visual)
})
intent('Read it please', p => {
    console.log("read it",p.visual.horoscopeData)
    if(p.visual.horoscopeData){
        p.play(`You seem ${p.visual.horoscopeData.mood} today ! your lucky number is ${p.visual.horoscopeData.lucky_number} ,your favourite color is ${p.visual.horoscopeData.color} and your compatibility is${p.visual.horoscopeData.compatibility}`);
        p.play('Want to hear more ?')
        p.then(confirmation)
        
    }else if(p.visual.data){
        p.play(p.visual.data); 
    
    
    }else if(p.visual.weatherNews){
         p.play(`It's ${p.visual.weatherNews.current.temp} degree , humidity is ${p.visual.weatherNews.current.humidity} percent`)
    }
    else{
        p.play("No article found to read"); 
    }

});

onCreateProject(() => {
     project.sign = {en: "Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces"};
 });



intent('Search for $(SIGN p:sign) news', async p => {
    let HoroscopeApiUrl = `https://aztro.sameerkumar.website/?`;
    if(p.SIGN.value){
        
   
        HoroscopeApiUrl = `${HoroscopeApiUrl}&sign=${p.SIGN.value.toLowerCase().split(" ").join('-')}&day=today`;
    try{
        const response = await api.axios.post(HoroscopeApiUrl,{
            headers:{
                'Accept':'*/*',
                'Content-Type':'multipart/form-data; boundary=<calculated when request is sent>',
            }
        })
        p.play({command:"horoscope",data:response.data,horoscopeTitle:p.SIGN.value})  
    }catch(error){
        console.log(error);
    }
    
    }

})
const confirmation = context(() => {
intent('(yes|yes please)', async (p) => {
p.play(`${p.visual.horoscopeData.description}`)
})

intent('no', (p) => {
    p.play('Sure, sounds good to me.')
})
})