
// const tabname = ["Angular", "Node.js", "JavaScript", "TypeScript", "HTML"];
// for

// for (let index = 0; index < tabname.length; index++) { //
//     const element = tabname[index];
//     console.log(element, 'for');
//
// }

//forEach
// console.clear();


// const res = tabname.forEach(name => { // retour de la function forEach est toujours undefined
//   console.log(name, "cool trouvéé");
//   return name
// });
// console.log(res)


// const res1 = tabname.map(name => { // retourne toujours le meme nbr delement recu en entrer sous forme de tableau
//     if(name === "Angular"){
//         console.log(name, "cool trouvéé");
//         return name
//     }
// });
// console.log(res1)


//  const res2 = tabname.filter(name => { // nous retounre toujours un tableau et que ce qui respecte la condition
//      if(name === "Angular") {
//          console.log(name, "cool trouvéé");
//          return name
//      }
//  })
// console.log(res2)

// const res3 = tabname.find(name => { // retourne un element
//     if(name === "Angular") {
//         console.log(name, "cool trouvéé");
//         return name
//     }
// })
// console.log(res3)
const ecoles = {
    students: [
        { name: "Alice", age: 20, class: "9th Grade" },
        { name: "Bob", age: 15, class: "10th Grade" },
        { name: "Charlie", age: 13, class: "8th Grade" },
        { name: "Ciana", age: 14, class: "9th Grade" },
        { name: "Ethan", age: 18, class: "10th Grade" }
    ],
    professors: [
        { name: "Mr. Smith", age: 40, subject: "Mathematics", yearsOfExperience: 15 },
        { name: "Ms. Johnson", age: 35, subject: "English", yearsOfExperience: 10 },
        { name: "Dr. Brown", age: 50, subject: "Physics", yearsOfExperience: 25 },
        { name: "Mrs. Jones", age: 45, subject: "History", yearsOfExperience: 20 },
        { name: "Mr. Garcia", age: 38, subject: "Chemistry", yearsOfExperience: 12 }
    ]
}
    ;






// const etudiant = {name :, age: , class:}

// { cler: valeur } // el.cler = valeur
// console.clear();
// const res4 = ecoles.students.filter(etudiant => {
//     // console.log(etudiant)
//     if (etudiant.age > 17) {
//         // console.log(etudiant.name, "cool trouvéé");
//         return etudiant.name
//     }
// })
// console.log(res4)

// const res5 = ecoles.students
//     .filter(etudiant => etudiant.age < 18)
//     .map(etudiant => {
//        return { ...etudiant, name: etudiant.name.toUpperCase() }
//     })



//  console.clear();
// console.log(res5)




// opération ternaire 
// ? true | : false | si on ne veut pas mettre de false remplace ? par &&
// | -> opt +shift + L
// Modification nom dossier img : Ellie Rose => Ellie