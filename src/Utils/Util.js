export function minRandomNumberGenerator(randomNumber){
    var currRandomNumber = Math.floor(Math.random() * 1000);
    if(randomNumber){
        if(currRandomNumber < randomNumber && currRandomNumber > randomNumber/2 ){
            return currRandomNumber
        }
        else{
            minRandomNumberGenerator(randomNumber)
        }
    }
}