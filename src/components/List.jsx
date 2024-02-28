import React, { useContext, useEffect, useState } from 'react';
import "./List.css";
import { myContext } from './Context';

const List = () => {
    const [employees, setEmployees] = useState();
    const contextData=useContext(myContext);

    // console.log(contextData);

    const getEmployeeDetails = async () => {
       
        try {
            const res = await fetch(`https://64de055c825d19d9bfb1e4af.mockapi.io/users`);
            const data = await res.json();
            setEmployees(data);
            
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const DeleteEmployee=async(id)=>{
        try {
            // const res=
            await fetch(`https://64de055c825d19d9bfb1e4af.mockapi.io/users/${id}`,{
                method:"DELETE"
            })
            // console.log(await res.json());
            setEmployees(employees.filter((item)=>item.id!==id));
            alert("Employee deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }
    const getEmployeeById=async(id)=>{
        try {
            const res=await fetch(`https://64de055c825d19d9bfb1e4af.mockapi.io/users/${id}`)
            const resdata=await res.json();
            contextData.setcontext(resdata);
            console.log(resdata);
            // setEmployees(employees.filter((item)=>item.id!==id));
            // alert("Employee edited successfully");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEmployeeDetails();
    }, []);
    return (
        <div className='employee_list'>
            <h1>Employee List</h1>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Mode of contact</th>
                        <th>Marital Status</th>
                        <th>Immediate joiner</th>
                        <th>Icons</th>
                    </tr>
                </thead>
                {/* ======================================================== */}
                <tbody>
                    {
                        employees && employees.map((item,index) => {
                            return (
                                <tr key={index}>
                                {/* {console.log(item.mode_of_contact)} */}
                                    <td>{item.id}</td>
                                    <td>{item.firstname} {item?.middlename} {item.lastname}</td>
                                    <td>{item.gender}</td>
                                    <td>{item?.phone_number}</td>
                                    <td>{item.mode_of_contact.phone===true&&item.mode_of_contact.email===true?"Phone,Email"
                                    :item.mode_of_contact.email===true?"Email"
                                    :item.mode_of_contact.phone===true?"Phone"
                                    :""}</td>
                                    <td>{item?.marrital_status}</td>
                                    <td>{item?.immediate_joiner}</td>
                                    <td>
                                    <i className="fa-solid fa-pen-to-square" title='edit' onClick={()=>getEmployeeById(item.id)}></i>
                                    <i className="fa-solid fa-trash" title='delete' onClick={()=>{DeleteEmployee(item.id)}}></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                    
                </tbody>
            </table>
        </div>
    );
}

export default List;
