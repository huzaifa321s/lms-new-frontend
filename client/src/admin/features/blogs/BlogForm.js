import React, { useCallback, useRef } from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';



const TEMPLATE_OBJ = {
  image: null,
  title: "",
  content: "<p></p>",
  category: "",
}

const defaultCover = `${process.env.REACT_APP_STORAGE_BASE_URL}/defaults/blog-image.png`;

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const editorRef = useRef(null);


  const [cover, setCover] = useState(null);
  const [blogObj, setBlogObj] = useState(TEMPLATE_OBJ);
  const [blogCategories, setBlogCategories] = useState([]);


  // Handling changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setBlogObj({ ...blogObj, [name]: value });
  },[blogObj]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    // Set display picture.
    const reader = new FileReader();
    reader.onload = (e) => setCover(e.target.result);
    reader.readAsDataURL(file);
    // Set the image file in registerObject
    setBlogObj((obj) => ({ ...obj, image: file }));
  },[]);

  const handleEditorChange = (content) => {
    setBlogObj((prevBlogObj) => ({ ...prevBlogObj, content: content }));
  };




  // Helper API Methods:
  const postData = useCallback(async (formData) => {
    try {
      let response = await axios.post("/admin/blog/add", formData);
      response = response.data;
      if (response.success) {
        alert('blog added!')
      };
      toast.success('Blog added successfully');
      console.log("Registration response -> ", response);
    } catch (error) {
      console.log("Registration Error -> ", error);
      toast.error('Internal server error');
      const errorResponse = error.response.data;
      console.log(errorResponse.message);

      console.log("Registration data -> ", error.response.data);
    }
  },[axios,toast])





  // API Methods
  const getBlog = useCallback(async (id) => {
    try {
      let response = await axios.get(`/admin/blog/getBlog/${id}`, {});
      response = response.data;

      if (response.success) {
        const courseDetail = response.data;
        setBlogObj(courseDetail);

        if (courseDetail.image) {
          setCover(`${process.env.REACT_APP_STORAGE_BASE_URL}/blog-images/${courseDetail.image}`);
        }
      }

    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error(errorMessage);
    }
  },[axios]);

  const create = () => {
    if (blogObj.title.trim() === "") {
      return console.log("Enter title!")
    } else if (blogObj.content.trim() === "") {
      return console.log("Enter content!")
    } else if (blogObj.category.trim() === "") {
      return console.log("Enter category!")
    } else {
      const blogForm = new FormData();
      for (const key in blogObj) {
        blogForm.append(key, blogObj[key]);
      }
      postData(blogForm);
    }
  }

  const update = useCallback(async () => {
    const blogForm = new FormData();
    for (const key in blogObj) {
      blogForm.append(key, blogObj[key]);
    }

    try {
      let response = await axios.put(`/admin/blog/edit/${id}`, blogForm);
      response = response.data;
      if (response.success) {
        const updatedBlog = response.data;
        setBlogObj(updatedBlog);
      };
      toast.success('Blog updated successfully');
      console.log("Registration response -> ", response);
    } catch (error) {
      console.log("Registration Error -> ", error);
      toast.error('Internal server error');
      const errorResponse = error.response.data;
      console.log(errorResponse.message);
      console.log("Registration data -> ", error.response.data);
    }
  },[axios,,blogObj,id,toast]);

  const getBlogCategories = useCallback(async () => {
    try {
      let response = await axios.get("/admin/blog-category/getAll");
      response = response.data;
      if (response.success) {
        setBlogCategories(response.data)
      }
    } catch (error) {
      console.log("Registration Error -> ", error);
    }
  },[axios]);






  useEffect(() => {
    if (id) {
      getBlog(id);
    }
    getBlogCategories();
  }, [id])

  return (
    <div>
      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          {id ? "Edit Blog" : "Create New Blog"}
        </div>
        <button className='btn' onClick={() => navigate('/admin/blogs')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </div>

      <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>
        <div className="w-1/2 mb-3 flex gap-4">
          <div className="form-control w-full">
            <label className="label label-text text-base-content"> Name </label>
            <input className="input input-bordered w-full" type="text" name='title' value={blogObj.title} onChange={handleChange} />
          </div>


          <div className="w-2/3 mb-3 flex">
            <div className="form-control w-full">
              <label className="label label-text text-base-content"> Category </label>
              <select
                className="select select-bordered w-full" value={blogObj.category}
                onChange={(e) => { setBlogObj(prevState => ({ ...prevState, category: e.target.value, })) }}
              >
                <option> Select category </option>
                {blogCategories.length > 0 && blogCategories.map((category) => (
                  <option key={category._id} value={category._id}> {category.name} </option>
                ))}
              </select>
            </div>
          </div>

        </div>


        <div>
          <label className="label label-text text-base-content"> Content </label>
          <Editor
            apiKey='93ruijg05gmbhogd98n12gie0bj6jkfkx3v5mcyw50kfpoob'
            // onInit={(evt, editor) => editorRef.current = editor}
            value={blogObj.content}
            init={{
              height: 500,
              selector: 'textarea',
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist | outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="mt-4 mb-2 flex gap-4">
          <div className="flex flex-col gap-3 justify-center">
            <div>A relevant picture for your blog post. </div>
            <div>
              <label htmlFor="imageInput" className="btn">{id ? "Change Image" : "Upload Image"}</label>
              <input id="imageInput" type="file" className="file-input file-input-bordered file-input-accent" style={{ display: "none" }} onChange={(e) => handleImageUpload(e)} />
            </div>
          </div>

          <img src={cover || defaultCover} alt="Dashwind Admin Template" className="w-10/12 h-96 inline-block rounded-md" />
        </div>



        <div className="mt-12">
          <button
            className="btn gradiant-btn float-right"
            // className="btn gradiant-btn float-right text-white hover:bg-blue-900 float-right"
            onClick={() => { id ? update() : create(); }}
          >
            {id ? "Save Changes" : "Create Blog"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default BlogForm