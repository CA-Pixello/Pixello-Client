import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../utils/context'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
//image imports: 
import placeholderImage from '../images/image-loading.png'
//react component imports: 
import { PermissionsBar } from './PermissionsBar'
//styled component imports: 
import { WhiteFeature } from './styled/WhiteFeature.styled'
import { PinkFeature } from './styled/PinkFeature.styled'
import { Username } from './styled/Username.styled'
import { Summary } from './styled/Summary.styled'
import { ProfileContainer, AvatarContainer, GridContainer } from './styled/Container.styled'
import { PhotoGrid } from './styled/PhotoGrid.styled'
import { PhotoPreview } from './styled/Photo.styled'
import { Avatar } from './styled/Avatar.styled'
import { Span } from './styled/Span.styled'
import { Count } from './styled/Count.styled'
import { Bio } from './styled/Bio.styled'

// NOTE TO SELF: add logic to show the permissions bar 
//only when the user is an admin, or is the 
//owner of the post/comment/profile

//to-do
//work out the post and like count
//for images, map through userPosts, 

export const Profile = () => {
   
    const { id } = useParams()

    const { store } = useGlobalState()
    const { loggedInJWT } = store

    //stores user data retreived by the axios request
    const [userData, setUserData ] = useState("")
    //deconstruct user data for use in render
    const {username, bio, avatarUrl} = userData

    //stores posts (created by the selected user) retreived by the axios request
    const [userPosts, setUserPosts ] = useState("")

    useEffect(() => {
        const authorisation = {
            headers: { Authorization: `Bearer ${loggedInJWT}` }
        };
        async function fetchUserData() {
            await axios.get(`https://pixello.herokuapp.com/users/${id}`, authorisation)
                .then(res => {
                    if (res.data) {
                        setUserData(res.data)
                    } 
                })
                .catch(err => console.log(err))
        }
        async function fetchPostData() {
            await axios.get(`https://pixello.herokuapp.com/...`, authorisation)
                .then(res => {
                    if (res.data) {
                        setUserPosts(res.data)
                    }
                })
                .catch(err => console.log(err))
        }
        fetchUserData()
        fetchPostData()
        return () => {
            setUserData("")
            setUserPosts("")
        }
    }, [id, loggedInJWT])

    return (
        <>
            {window.innerWidth < 450 ? <PinkFeature><WhiteFeature/></PinkFeature> : null}
            <ProfileContainer>
                {window.innerWidth < 450 ? <PermissionsBar/> : <PermissionsBar desktop="true"/> }
                <Username fontSize="1.5rem" profile="true">{username}</Username>
                <Bio profile="true">{bio}</Bio>
                <AvatarContainer>
                    <Avatar unClickable="true" profile="true" src={avatarUrl || placeholderImage} alt="profile picture"/>
                </AvatarContainer>
                <Summary>
                    <Count><Span>Posts: </Span>9</Count>
                    <Count><Span>Likes: </Span>2.5K</Count>
                </Summary>
                <GridContainer>
                    <PhotoGrid>
                    {userPosts ? userPosts.map((obj) => {
                        return <Link key={obj.id} to={`/post/${obj.id}`}><PhotoPreview src={obj.avatarUrl || placeholderImage} alt={obj.caption}/></Link>
                        }) : null }
                    </PhotoGrid>
                </GridContainer>
            </ProfileContainer>
        </>
    )
}