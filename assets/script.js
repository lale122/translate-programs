const lan1= document.querySelector("#select1")
const lan2= document.querySelector("#select2")
const text1 = document.querySelector("#text1")
const text2 = document.querySelector("#text2")
const btn = document.querySelector('button')

async function language() {
    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ea19e3fc8mshea95cec8a68259ap14903cjsnc17fbe48f52b',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        for (let i in result.data.languages) {
            const option = document.createElement('option')
            option.value=result.data.languages[i].code
            option.innerHTML = result.data.languages[i].name
            select1.append(option)
            
        }
        for(let j in result.data.languages){
            const option = document.createElement('option')
            option.value=result.data.languages[j].code
            option.innerHTML = result.data.languages[j].name
            select2.append(option)
        }
        
    } catch (error) {
        console.log(error)
      
    }
}

language()

btn.addEventListener('click', async function() {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'fbb114645cmsh2b01b1fbd9c69abp15f1cfjsndf48073d8f2a',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: lan1.value,
            target_language: lan2.value,
            text: text1.value
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const translate = JSON.parse(result)
        text1.textContent = result
        text2.innerHTML = translate.data.translatedText

    } catch (error) {

        alert("An error occurred, please check again")
        
    }

})
