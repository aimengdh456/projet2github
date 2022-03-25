import React, { useState } from "react";
const Component = () => {
    const [nomutilisateur, setnom] = useState("");
    const [informations, setinfos] = useState({});
    const [projets, setprojets] = useState([]);
    const onChangeHandler = e=> {
        setnom(e.target.value);
      };
    
      const submitHandler = async e => {
       e.preventDefault();
    
        const profil = await fetch(`https://api.github.com/users/${nomutilisateur}`);
        const profiljson = await profil.json();
        const listedeprojets = await fetch(profiljson.repos_url);
        const  listedeprojetsjson = await listedeprojets.json();
        console.log(listedeprojetsjson);
       
    
        if (profiljson) {
          setinfos(profiljson);
          setprojets(listedeprojetsjson);
        }
      };
    return (
        <>
          <div >
            <div >
            <div className="topnav">
            <a className="active" href="#home">Home</a>
               <a href="#about">Github Dashboard Sample</a>
            
                <input 
                  type="text"
                  value={nomutilisateur}
                  onChange={onChangeHandler}
                />
             
    
              <button className="searchbar"
                type="submith"
                onClick={submitHandler}
              >
               
               Rechercher
              </button>
              </div>
              <div >
          <thead  className="customers">
            <tr>
              <th>Nom</th>
              <th>Avatar</th>
              <th>Liste des projets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{informations.name}</td>
              <td className="">
                {!informations.avatar_url ? (
                  " "
                ) : (
                  <img
                   
                    src={informations.avatar_url}
                    alt={informations.avatar_url}
                  />
                )}
              </td>
           
              <td>
                {projets.map(projet => (
                  <div  >
                    <div >
                      <div>
                        <a href={projet.html_url}  >
                          {projet.name}
                        </a>
                      </div>
                      <table >
          <thead>
            <tr>
            <th>langage utilisé :</th>
             <th> La description</th>
             <th> date création</th>
             <th> date modification </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{projet.language}</td>
              <td>{projet.description}</td>
              <td>{projet.created_at}</td>
              <td>{projet.updated_at}</td>
            </tr>
          </tbody>
        </table>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </div>
            </div>
          </div>
        </>
      );
     
};


export default Component;