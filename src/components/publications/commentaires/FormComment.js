import React, { useState } from 'react'
import '../../../styles/css/style.css'


export default function FormComment({idPublication, commentSubmit, close}) {
    const [content, setContent] = useState([]);

    return (
        <div className='formComment'>
            <div className='col-md-6'> 
                <input placeholder="Votre commentaire..." className='form-control' name="content" onChange={(e) => setContent(e.target.value)}/>
            </div>

            <div className='col-md-2'>
                <button className='button-custom' onClick={ () => commentSubmit(idPublication, content)}>
                    Envoyer

                    
                </button>
            </div>
            <div className='col-md-2 btn-masquer'>
                <button className='button-custom button-custom-outline' onClick={ () => close(idPublication)}>
                    Masquer
                </button>
            </div>
        </div>
    )
}

