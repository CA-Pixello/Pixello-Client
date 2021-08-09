import React from 'react'
import { Link } from 'react-router-dom'
//image imports: 
import like from '../images/like-green.svg'
import profilePicture from '../images/profile-picture.jpeg'
//styled component imports: 
import { StyledLink } from './styled/StyledLink.styled'
import { Username } from './styled/Username.styled'
import { Photo } from './styled/Photo.styled'
import { IconPost } from './styled/Icon.styled'
import { Avatar } from './styled/Avatar.styled'
import { ContainerPost } from './styled/Container.styled'
import { Caption } from './styled/Caption.styled'

export const Post = ({ post }) => {
    // const {likes, username, caption, avatarUrl, category, id, imageId} = post 
    const {username, caption, avatarUrl, id} = post 

    return (
        <>
            <Link to={`/post/${id}`}><Photo post="true" src={avatarUrl} alt={caption}/></Link>
            <ContainerPost>
                <Link to={`/profile/${id}`}><Avatar post="true" src={profilePicture} alt="profile picture"/></Link>
                <IconPost src={like} alt="like button"/>
                <StyledLink to={`/profile/${id}`}><Username post="true" fontSize="0.9rem">{username}</Username></StyledLink>
                <Caption post="true">{caption}</Caption>
            </ContainerPost>
        </>
    )
}