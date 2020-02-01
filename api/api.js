class Api extends Actions {
    constructor() {
        super();
        this.url = "http://localhost:3333";
        this.getGata()
        this.sendForm()
    }

    async getGata(){
        const response  =  await fetch(`${this.url}/devs`)
 
        if(await response.status == 200){
            var data = await response.json();
 
             this.ul.classList.remove('disabled')
             this.renderDev(data)
         } 
 
         this.faz(data)
         this.edit();
     }


}


new Api()