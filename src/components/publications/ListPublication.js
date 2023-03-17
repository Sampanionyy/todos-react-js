import React, {useContext, useEffect, useState} from 'react'
import { GlobalContext } from '../../App';
import '../../styles/css/style.css'
import FormComment from './commentaires/FormComment';
import FormPublication from './FormPublication';
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";


export default function ListPublication () {
    const globalContext = useContext(GlobalContext);
    const [commentaires, setCommentaires] = useState([]);

    const commentSubmit = (idPublication, content) => {
        let commentaire = {
            id: commentaires.length ,
            contentComment: content,
            idPublication: idPublication
        };
        
        setCommentaires([...commentaires, commentaire]);
    }

    const deletePublication = (id) => {
        globalContext.setPublications(globalContext.publications.filter((publication) => publication.id != id));
    }

    const handleLike = (index) => {
        let pub = globalContext.publications;

        for (let i = 0; i < pub.length; i++) {
            let onePub = pub[i];
            if (onePub.id === index) {
                pub[i].like = !pub[i].like;
            }
        }

        globalContext.setPublications([...pub])
    }

    const handleComment = (index) => {
        let pub = globalContext.publications;

        for (let i = 0; i < pub.length; i++) {
            let onePub = pub[i];
            if (onePub.id === index) {
                pub[i].comment = !pub[i].comment;
            }
        }

        globalContext.setPublications([...pub])
    }

    return (
        <div className='container'>
            <FormPublication/>
           
            {globalContext.publications.map((publication, index) => 
                <div className="divContent liste_publication">
                    <div className='publication'>
                        <div className='publicationHeader'>
                            <h5 className=''>{publication.titre}</h5>
                            <button type="button" className="btn-close  btn-close-dark" onClick={() => deletePublication(publication.id)} aria-label="Close"></button>
                        </div>

                        <div className='text_publication'>
                            {publication.contenu}
                        </div>
                        <div className='actions'>
                            <div className='like'>{(!publication.like) ? <AiOutlineLike onClick={() => handleLike(publication.id)} /> : <AiTwotoneLike  onClick={() => handleLike(publication.id)} /> }</div>
                            <a className="comment button-custom" hidden={publication.comment} style={{ cursor: "pointer", marginLeft: "3px"}} onClick={() => handleComment(publication.id)}>Commenter</a>
                                { publication.comment 
                                    ? <FormComment
                                        
                                        idPublication = {publication.id}
                                        commentSubmit = {commentSubmit}
                                        close = {handleComment}
                                        />
                                : ''}
                        </div>
                    </div>
                    <div className='commentaires'>
                        { commentaires.map((commentaire) => 
                            publication.id === commentaire.idPublication 
                                ? <div className='oneComment'>{commentaire.contentComment}</div>
                                : ''
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

