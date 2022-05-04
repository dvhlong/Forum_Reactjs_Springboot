import React,{useState,useEffect} from 'react';
import '../CSS/CreateAndEditPost.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function CreatePost(){
    return(
        <div>
            <h1 style={{textAlign:"center",color:"white"}}>Create New Post</h1>
            <div className='post-container'>
                <div className='post-label'>
                    Topic:
                </div>
                <div className='post-select'>
                <Form.Select aria-label="Default select example" 
                    // value={topicId} onChange={chooseTopic}
                >
                    <option value="0"> Select Topic</option>
                    {/* {
                        topicList.map(
                            topic=>
                            <option key={topic.id} value={topic.id}>{topic.topicname}</option>
                        )
                    } */}
                </Form.Select> 
                </div>
                <div className='post-label'>
                    Title:
                </div>
                <div className='post-input'>
                    <Form.Control></Form.Control>
                </div>
                <div className='post-label'>
                    Content:
                </div>
                <div className='post-content'>
                <CKEditor
                    editor={Editor}
                    // data={editPostContent}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // setEditPostContent(data);
                    } }                    
                /> 
                </div>
                <div className='post-footer'>
                    <Button variant="primary" >Create</Button>
                </div>
            </div>
        </div>
    )
}
export default CreatePost;