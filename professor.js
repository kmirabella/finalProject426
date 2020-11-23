async function getProfessors() {
    const professor = await Axios({
        method: 'get',
        url: 'https://comp426backend.herokuapp.com/professor',
        withCredentrials: true,

    });
    console.log(professor.data)
    return professor.data;
}
let p = getProfessors()
console.log(p)

function getExams() {
    let allProfessors = getProfessors()
    for(p in allProfessors) {
        for (let i = 0; i < professor.classes.length; i++) {
            return;

        }
    }
    
    
}