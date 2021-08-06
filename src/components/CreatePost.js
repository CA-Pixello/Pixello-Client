import React, {useState} from 'react'
import styled from 'styled-components'
import plus from '../images/plus-white.svg'
//import styled components
import { WhiteFeature } from './styled/WhiteFeature.styled'
import { PinkFeature } from './styled/PinkFeature.styled'
import { TopClearance } from './styled/TopClearance.styled'
import { Textarea } from './styled/Textarea.styled'
import { TextCreatePost } from './styled/Text.styled'
import { SubHeader, Header } from './styled/Header.styled'
import { Select } from './styled/Select.styled'
import { PlusCircle } from './styled/Circle.styled'
import { Label } from './styled/Label.styled'
import { Input } from './styled/Input.styled'
import { PlusIcon } from './styled/Icon.styled'
import { Form } from './styled/Form.styled'
import { ContainerCreatePost } from './styled/Container.styled'


export const CreatePost = () => {
    
    const [fileName, setFileName] = useState("No File Chosen")

    function displayFileInfo(e) {
        setFileName(e.target.files[0].name)
    }
    
    return (
        <>  
            {window.innerWidth < 450 ? <PinkFeature><WhiteFeature/></PinkFeature> : <TopClearance/>}
            <ContainerCreatePost>
                <Header createPost="true">Hey there, john_wilson,</Header>
                <SubHeader>We're excited to see what you'll share!</SubHeader>
                <Form>
                    <Label createPost="true" htmlFor="photo-upload">
                        <TextCreatePost upload="true">Upload your photo</TextCreatePost>
                        <PlusCircle createPost="true">
                            <PlusIcon createPost="true" src={plus} alt="plus sign"/>
                        </PlusCircle>
                        <TextCreatePost>{fileName}</TextCreatePost>
                    </Label>
                    <Input createPost="true" type="file" id="photo-upload" accept=".png, .jpg, .jpeg" hidden onChange={displayFileInfo}/>
                    <Textarea id="caption" placeholder="Give it a caption"/>
                    <Select name="category">
                        <option value="default" hidden>Categories</option>
                        <option value="film">Film</option>
                        <option value="candid">Candid</option>
                        <option value="water">Water</option>
                    </Select>
                    <Input createPost="true" type="submit" value="Share!"/>
                </Form>
            </ContainerCreatePost>
        </>
    )
}