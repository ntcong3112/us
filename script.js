const axios = require("axios")

const getImage = async () => {
    const a = await axios.get('https://memory-backend-3g95.onrender.com/api/memories?populate=*')
    console.log(a)
    const ab = document.getElementById('time_line_item_list')
    a.innerHTML = 
    
    
    `
   `
}

getImage();

