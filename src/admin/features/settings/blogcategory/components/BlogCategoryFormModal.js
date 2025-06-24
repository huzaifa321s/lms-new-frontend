import React, { useEffect, useState } from 'react'

const BlogCategoryFormModal = ({ add, edit, del, closeModal, ModalId, actionType, obj }) => {


    const [tempObj, setTempObj] = useState({ name: "" });

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setTempObj({ ...tempObj, [name]: value })
    }

    useEffect(() => {
        if (obj) {
            console.log("Obj ---> ", obj)
            setTempObj(obj)
        }
    }, [obj])

    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                {(actionType === "add" || actionType === "edit") && (
                    <>
                        <h3 className="font-bold text-lg">
                            {actionType === "add" ? "Add Category" : "Edit Category"}
                        </h3>

                        <div>
                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Name </label>
                                <input className="input input-bordered w-full" type="text" name='name' value={tempObj.name} onChange={handleCategoryChange} />
                            </div>

                        </div>



                        <div className="modal-action">
                            <button className="btn gradiant-btn float-right" onClick={() => {
                                actionType === "add" ? add(tempObj) : edit(tempObj);
                            }}>
                                {actionType === "add" ? "Add" : "Save Changes"}
                            </button>
                            <button className="btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </>)
                }


                {(actionType === "del" || actionType === "confirmDel") && (
                    <>
                        <h3 className="font-bold text-lg">
                            {actionType === "del" && "Are you sure you want to delete this category."}
                            {actionType === "confirmDel" && "This blog category contain some blog, if you delete this category all blogs with this category will be deleted!"}
                        </h3>
                        <div className="modal-action">
                            <button className="btn gradiant-btn float-right" onClick={() => del(tempObj)}>Confirm</button>
                            <button className="btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </>)
                }
            </div>
        </dialog>
    )
}

export default BlogCategoryFormModal