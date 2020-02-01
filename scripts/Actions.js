class Actions {

    constructor(){
        this.loading = document.querySelector(".loading")
        this.formInputs = document.querySelectorAll("#form-data input")
        this.ul = document.querySelector("#dev")
        this._formCad = document.querySelector("#form-cad #form-data")
        
        this._form_data = document.querySelector("#form-cad");
        this.geoLocation();
    }

    geoLocation(){
        let lat = document.querySelector("#latitude");
        let long = document.querySelector("#longitude") 

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>{

                lat.value = position.coords.latitude
                long.value = position.coords.longitude
            })
          } else {
            alert("I'm sorry, but geolocation services are not supported by your browser.");
        }
    }

    valueInputs(inputs){
        let inputsValue = {}
        inputs.forEach(item=> {
            if(item.value == ''){
                item.classList.add("valida")
                item.setAttribute('placeholder', "Campo não pode ser vazio :)");
                return false;
            }
            inputsValue[item.name] = item.value
        })

        return inputsValue
    }

    sendForm(){
        let form = document.querySelector("#form-data")
        let btn = document.querySelector('button[type=submit]')

        form.addEventListener("submit", event=> {
            event.preventDefault()
            let bodyInfo = this.valueInputs(this.formInputs);
            let result = this.save(bodyInfo)
            result.then(dev=>{
                let li = this.addUser(dev)
                    this.addDataDev(dev, true)
                    this.editOne(li.querySelector('button.action-edit'))
                btn.innerHTML = "Usuário salvo"
                btn.classList.add('saved')
                form.reset()
            })

            setTimeout(()=>{
                btn.classList.remove('saved')
                btn.innerHTML = "Enviar"
            },4000)
        })
    }

    actionsBntFormEdition(){
        const btnCancel = document.querySelector("button.cancel")
        const btnSave = document.querySelector("button.save")

        btnCancel.addEventListener('click', event=>{
            event.preventDefault()
            this.removeForm()
        })

        btnSave.addEventListener('click', event=>{
            let inptusUp = document.querySelectorAll("#form-data-up input")
            event.preventDefault();
            let bodyInfo = this.valueInputs(inptusUp)

            this.update(bodyInfo)
                .then(result=>{
                    this.updateInfo(result)
            })
        })
    }

    addDataDev(data, condition = false){
        let btns = document.querySelectorAll('button.action-edit')
        
        if(condition){
            console.log(data)
            btns = document.querySelectorAll('button.action-edit')[btns.length -1]
            btns.dataset.info = JSON.stringify(data)
            return
        }

        for(let indice = 0; indice < btns.length; indice++){
            btns[indice].dataset.info = JSON.stringify(data[indice])
        }
    }

    edit(){
        let btns = document.querySelectorAll('button.action-edit')
        btns.forEach(btn => {
            this.editOne(btn)
        })
    }

    editOne(btn){
        let formCad = document.querySelector("#form-cad")
        let formUp = document.querySelector("#form-up")

        btn.addEventListener('click',(event)=> {
            this.actionsBntFormEdition()
            let { techs, github_username, _id, location } = this.infoUser(event)
            this.addInput(_id)
            
            formCad.classList.add("formDisabled")
            formUp.classList.add("formActive") 
            Actions.blockInputs()
        
            let inputTechs = document.querySelector('#form-data-up #techs'); 
            let inputGithub_username = document.querySelector('#form-data-up #github_username'); 
            let inputLatitude = document.querySelector('#form-data-up #latitude'); 
            let inputLongitude = document.querySelector('#form-data-up #longitude'); 
            
            inputLatitude.value = location.coordinates[0]
            inputLongitude.value = location.coordinates[1]
            inputGithub_username.value  = github_username 

            inputTechs.focus()
            inputTechs.style.borderBottom = "1px solid #6931ca"
            inputTechs.value = this.techsParser(techs)
        })
    }

    infoUser(objectUser){
        let result =  objectUser.target.dataset.info ? JSON.parse(objectUser.target.dataset.info) : JSON.parse(objectUser.toElement.dataset.info)
        return result
    }

}


new Actions()