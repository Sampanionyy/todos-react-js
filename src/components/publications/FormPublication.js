import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../App';
import '../../styles/css/style.css'

export default function FormPublication() {
    const globalContext = useContext(GlobalContext);

	const [id, setId] = useState(globalContext.todos.length + 1);
    const [defaultValue, setDefaultValue] = useState({
        titre: 'Title',
        contenu: 'content'
    })

    const [publication, setPublication] = useState(defaultValue);
    
    const update = (e) => setPublication({...publication, [e.target.name] : e.target.value})
  
    const handleClick = () => {
        globalContext.setPublications([...globalContext.publications, publication])

    };

    useEffect(() => setId(globalContext.publications.length + 1), []); //[] => lorsque le component est chargé

    useEffect(() => {
        setId(id + 1);
        setPublication({...defaultValue, id:id});
    }, [globalContext.publications])

	return (
		<div className='formPublication'>
			<h4 className='title'>Créer une publication</h4>

			<div className='col-md-6'>
				<input
				className="form-control"
				onChange={update}
				value={publication.titre}
				placeholder="Titre de votre publication..."
				type="text"
				name="titre"
				/>
			</div>

			<div className='col-md-6'>
				<textarea
				className="form-control"
				onChange={update}
				type="text"
				value={publication.contenu}
				name="contenu"
				placeholder="Contenu de votre publication..."
				></textarea>
			</div>
			
			<div className='text-end' >
				<button className="button-custom" onClick={() => handleClick()}>
					Publier
				</button> 
			</div>
		</div>
	)
}
