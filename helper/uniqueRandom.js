import uniqueRandom from "unique-random";


const randomUnique =  ()=>{
    const random = uniqueRandom(1000, 9999);

   return random().toString();

}

export default randomUnique;

