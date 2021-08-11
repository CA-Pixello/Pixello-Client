import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useGlobalState } from '../utils/context'
//image imports: 
import refresh from '../images/refresh.svg'
import filter from '../images/category-search.svg'
//react component imports:
import { Post } from './Post' 
//styled component imports:
import { BottomClearance } from './styled/BottomClearance.styled'
import { TopClearance } from './styled/TopClearance.styled'
import { Logo } from './styled/Logo.styled'
import { CenteringContainer, IconsContainer } from './styled/Container.styled'
import { IconHome } from './styled/Icon.styled'

export const CategoryFilter = () => {
    
    const { category } = useParams()

    const { store} = useGlobalState()
    const { loggedInJWT } = store

    const [postData, setPostData ] = useState("")
    const [matchingPosts, setMatchingPosts] = useState(true)
    
    //used to trigger useEffect when refresh icon is clicked
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        const authorisation = {
            headers: { Authorization: `Bearer ${loggedInJWT}` }
        };
        async function fetchData() {
            await axios.get(`https://pixello.herokuapp.com/posts`, authorisation)
                .then(res => {
                    //sort reverses the order so that newer images appear first on the home page
                    const retrievedData = res.data.sort((a,b) => b - a)
                    //isolate posts that match requested category
                    let requestedPosts = []
                    for (let post of retrievedData) {
                        if (post.category.toLowerCase() === category.toLowerCase()) {
                            requestedPosts.push(post)
                        }
                    }
                    if (requestedPosts.length > 0) {
                        setMatchingPosts(true)
                        setPostData(requestedPosts)
                    } else {
                        setMatchingPosts(false)
                    }
                })
                .catch(err => console.log(err))
        }
        fetchData()
        return () => {
            setPostData("")
        }
    }, [trigger, category, loggedInJWT])
    
    function handleClick() {
        let num = trigger + 1
        setTrigger(num)
    }

    return (
        <>
            {window.innerWidth < 450 ? <Logo home="true">Pixello</Logo> : <TopClearance/>}
            <IconsContainer refresh="true">
                <IconHome refresh="true" onClick={handleClick} src={refresh} alt="refresh icon"/>
                <Link to="/filter"><IconHome filter="true" src={filter} alt="filter icon"/></Link>
                </IconsContainer>
            { postData ? 
                postData.map(obj => <Post post={obj} key={obj.id}/>) 
                    : !matchingPosts ?
                    <CenteringContainer nopostsyet="true">
                        <p><em>There are no photos in the {category} category yet...</em></p>
                    </CenteringContainer>  
                        :
                        <CenteringContainer nopostsyet="true">
                            <p><em>Loading {category} photos...</em></p>
                        </CenteringContainer>        
            }
            {window.innerWidth < 450 ? <BottomClearance/> : <BottomClearance desktop="true"/>}
        </>
    )
}

