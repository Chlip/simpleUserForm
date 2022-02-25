'use strict'
// form inputs
let uname = document.getElementById('inputName')
let surname = document.getElementById('inputSurname')
let pesel = document.getElementById('inputPESEL')
let bday = document.getElementById('bday')

// form verification after every button pressed 
uname.addEventListener('keyup', e => {
    lengthValidate(20, e)

})
surname.addEventListener('keyup', e => {
    lengthValidate(30, e)
})
pesel.addEventListener('keyup', e => {
    e.target.value.length == 11 && peselVerify(pesel.value) ? e.target.classList.remove('is-invalid') : e.target.classList.add('is-invalid')
    e.target.value.length == 11 && peselVerify(pesel.value) ? e.target.classList.add('is-valid') : e.target.classList.remove('is-valid')
    if (e.target.value.length >= 6) {
        bday.value = calculateBday(e.target.value) != undefined ? calculateBday(e.target.value) : ""
    }
})



// wyslanie formularza oraz wyswietlenie odpowiedniego moodla
document.getElementById('userForm').addEventListener('submit', e => {
    e.preventDefault();
    if (formValid()) {
        swal("Wysłane", "Dziękujemy za wypełnienie formularza!", "success");
        //JSON with data
        let result = JSON.stringify({
            name: uname.value,
            surname: surname.value,
            pesel: pesel.value,
            bday: bday.value
        })
        //console.log(result)
    } else {
        swal("Coś poszło nie tak", "Upewnij się, że poprawnie wypełniłeś formularz", "error");
        uname.value.trim() == "" ? uname.classList.add('is-invalid') : ""
        surname.value.trim() == "" ? surname.classList.add('is-invalid') : ""
        pesel.value.trim() == "" ? pesel.classList.add('is-invalid') : ""
    }
})

// form validation
let formValid = () => {
    if (uname.value.trim() == "" || surname.value.trim() == "" || pesel.value.length != 11 || bday.value == "" || !peselVerify(pesel.value))
        return false
    return true
}

// checking if user input exists or exceeds max amount of letters 
let lengthValidate = (len, e) => {
    e.target.value.trim().length >= 1 && e.target.value.trim().length <= len ? e.target.classList.remove('is-invalid') : e.target.classList.add('is-invalid')
    e.target.value.trim().length >= 1 && e.target.value.trim().length <= len ? e.target.classList.add('is-valid') : e.target.classList.remove('is-valid')

}

// calculating check digit for person id
let peselVerify = (p) => {
    let weight = [1, 3, 7, 9]
    let sum = 0
    let i = 0
    p.slice(0, -1).split("").map(e => {
        sum += (e * weight[i++]) % 10
        if (i == 4) i = 0
    })
    if (p.charAt(p.length - 1) == (10 - (sum % 10 == 0 ? 10 : sum % 10)))
        return true
    return false
}

// calculating birth date from first 6 digits of person id
let calculateBday = (p) => {
    let year
    let month = p.substr(2, 2)
    let day = p.substr(4, 2)
    if (month > 80 && month < 93) {
        year = '18'.concat(p.substr(0, 2))
        month -= 80
    } else if (month > 0 && month < 13) {
        year = '19'.concat(p.substr(0, 2))
    } else if (month > 20 && month < 33) {
        year = '20'.concat(p.substr(0, 2))
        month -= 20
    } else if (month > 40 && month < 53) {
        year = '21'.concat(p.substr(0, 2))
        month -= 40
    } else if (month > 60 && month < 73) {
        year = '22'.concat(p.substr(0, 2))
        month -= 60
    } else {
        return undefined
    }
    // making sure month is in correct format
    month = ('0' + month).slice(-2)
    return `${year}-${month}-${day}`
}