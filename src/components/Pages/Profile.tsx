

import React from 'react'
import {gql, useQuery} from "@apollo/client"


const ME_QUERY = gql `
    query me {
        me {
            id
            Profile {
                id
                bio
                location
                website
                avatar
            }
        }
    }

`

export default function  Profile() {
    const {loading, error, data} = useQuery(ME_QUERY)
    if(loading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>
    console.log(data)
    return (
        <div className="container">
            <h1>Profile</h1>
            <p>{data.me.profile.bio}</p>
            <p>{data.me.profile.location}</p>
            <p>{data.me.profile.website}</p>
        </div>
    )
}


