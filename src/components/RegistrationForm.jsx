import React, { useContext, useEffect, useState } from 'react';
import "./RegistrationForm.css"
import { myContext } from './Context';

const RegistrationForm = () => {
    const contextData=useContext(myContext);
    // console.log(contextData);
    const [data, setData] = useState({
        firstname: '',
        middlename: "",
        lastname: "",
        gender: "",
        phone_number: "",
        // mode_of_contact:"",
        marrital_status: 'single',
        immediate_joiner: "",

    })
    const [checkData, setCheckData] = useState({
        phone: false,
        email: false,
    });
    
    const handleCheckBox = (e) => {
        console.log(e.target.checked);
        setCheckData({ ...checkData, [e.target.name]: e.target.checked });
    }
    // console.log(data);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    // console.log(data);
    const clearForm = () => {
        setData({
            firstname: '',
            middlename: "",
            lastname: "",
            gender: "",
            phone_number: "",
            // mode_of_contact:"",
            marrital_status: '',
            immediate_joiner: "",

        });
        setCheckData({
            phone: false,
            email: false,
        })
    }
    const handleSubmit = async () => {
        // e.preventDefault();
        try {
            // const res = 
            await fetch(`https://64de055c825d19d9bfb1e4af.mockapi.io/users`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname: data.firstname,
                    middlename: data.middlename,
                    lastname: data.lastname,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    mode_of_contact:checkData,
                    marrital_status: data.marrital_status,
                    immediate_joiner: data.immediate_joiner,
                })
            }).then((data)=>{
                console.log(data);
                if(data.status===201){
                    clearForm();
                    alert("Form submitted successfully");
                }
            })
            
        } catch (error) {
            console.log("Error occued during post data", error)
        }

    }
    const updateEmployee=async(id)=>{
        try {
            const res=await fetch(`https://64de055c825d19d9bfb1e4af.mockapi.io/users/${id}`,{
                method:"PUT",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    firstname: data.firstname,
                    middlename: data.middlename,
                    lastname: data.lastname,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    mode_of_contact:checkData,
                    marrital_status: data.marrital_status,
                    immediate_joiner: data.immediate_joiner,
                })
            });
            const resData=await res.json();
            setData(resData);
            alert("Data updated Successfully");
            console.log(resData);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
       
            if(contextData){
                setData({
                    firstname:contextData?.context?.firstname,
                    lastname:contextData?.context?.lastname,
                    middlename:contextData?.context?.middlename,
                    gender: contextData?.context?.gender,
                    phone_number: contextData?.context?.phone_number,
                    
                    marrital_status: contextData?.context?.marrital_status,
                    immediate_joiner: contextData?.context?.immediate_joiner,
                    
                });
                setCheckData({
                    // mode_of_contact:contextData?.context?.mode_of_contact, onSubmit={(e) => { handleSubmit(e) }}
                    email:contextData?.context?.mode_of_contact.email,
                    phone:contextData?.context?.mode_of_contact.phone
                })
                console.log(contextData);
            }
    },[contextData])
    return (
        <div className='Employee_registration'>

            <div className="container">
                <div className="title"> Employee Registration</div>
                <form >
                    <div className="user__details">
                        <div className="input__box">
                            <span className="details required">First Name</span>
                            <input type="text"
                                placeholder="First Name"
                                name='firstname'
                                value={data.firstname}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="input__box">
                            <span className="details">Middle Name</span>
                            <input type="text"
                                placeholder="Middle Name"
                                value={data.middlename}
                                onChange={handleChange}
                                name='middlename' />
                        </div>
                        <div className="input__box ">
                            <span className="details required">Last Name</span>
                            <input type="text"
                                placeholder="Last Name"
                                name='lastname'
                                value={data.lastname}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className="gender_details">
                            <span className="details required">Gender </span>

                            <input type="radio" id='male' value="male" checked={data.gender==="male"?true:false} name='gender' onChange={handleChange} />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id='female' value="female" checked={data.gender==="female"?true:false} name='gender' onChange={handleChange} />
                            <label htmlFor="female">Female</label>
                            <input type="radio" id='others' value="others" checked={data.gender==="others"?true:false}   name='gender' onChange={handleChange} />
                            <label htmlFor="male">Others</label>
                        </div>


                        <div className="input__box">
                            <span className="details required">Phone Number</span>
                            <input type="number"
                                placeholder="Phone Number"
                                name='phone_number'
                                value={data.phone_number}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className="Check__box">
                            <span className="details required">Mode Of Contact</span>
                            <input type="checkbox" id='email' name='email' checked={checkData.email} onChange={handleCheckBox} />
                            <label htmlFor="email">Email</label>
                            <input type="checkbox" id='phone' name='phone' checked={checkData.phone} onChange={handleCheckBox} />
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className="input__box maritalStatus">
                            <span className="details required">Marital Status</span>
                            <select name="marrital_status" id="maritalStatus" value={data.marrital_status} onChange={handleChange} required>
                                <option defaultValue="single" >Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </select>
                        </div>

                        <div className="gender_details">
                            <span className="details required">Immediate joiner </span>

                            <input type="radio" id='yes' value="yes" checked={data.immediate_joiner==="yes"?true:false} name='immediate_joiner' onChange={handleChange} />
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" id='no' value="no" checked={data.immediate_joiner==="no"?true:false} name='immediate_joiner' onChange={handleChange} />
                            <label htmlFor="no">No</label>
                        </div>

                    </div>

                    {/* <div className="button"> */}
                    {
                        contextData.context!==undefined 
                        ?<button type='button' className='button' onClick={()=>updateEmployee(contextData.context.id)}>Update</button>
                        :<button type='button' className='button' onClick={handleSubmit}>Submit</button>
                    }
                    {/* <button type='submit' className='button'>Submit</button> */}
                    <button type='button' className='button' onClick={clearForm}>Clear</button>
                    {/* </div> */}
                </form>
                {/* </form> */}
            </div>
        </div>
        // </div >
    );
}

export default RegistrationForm;
