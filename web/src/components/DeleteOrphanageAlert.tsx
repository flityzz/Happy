import React from 'react'

export default function DeleteOrphanageAlert(name, userId, orphanageId){
    return (
        alert(`tem certeza que deseja deletar o orfanato ${name} ${userId} ${orphanageId}`)
    )
}