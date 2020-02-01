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


}


new Actions()