import React from 'react'
import "./Info.css"

const Info = ({ info }) => {

    if (!info) return (<>loading</>)
    const fullName = `${info.first_name} ${info.last_name}`
    const image = info.image_url
    const campus = info.campus[0].name
    const cursus = info.cursus_users.filter(c => c.cursus.name === '42cursus')[0]

    console.log(cursus)
    return (
        <div>
            <h1>{fullName}</h1>
            <img src={image} alt="profile"/>
            <p>{`Campus -> ${campus}`}</p>
            <p>{`Cursus -> ${cursus.cursus.name} in ${cursus.level}`}</p>
        </div>
    )
}

export default Info