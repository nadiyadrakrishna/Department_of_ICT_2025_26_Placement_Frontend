import { useState } from "react";
import axios from "axios";

const CompanyRegistration = () => {
    const [formData,setFormData]=useState({
        companyName: '',
        email: '',
        password: '',
        contact: '',
        description: ''
    });


    const handleChange=(e)=>{
        const{name,value}=e.target;

        setFormData(prev=>({
            ...prev,
            [name]:value
        }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formData);
        try{
            const res=await axios.post("http://localhost:3000/company/register",formData);
             alert(res.data.message);
        }catch(error)
        {
            console.log(error);
        }
    };

    return ( 
        <form onSubmit={handleSubmit}>
            <h2>Company Registration</h2>

            <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} /><br/>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
            <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
            <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} /><br/>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} /><br/>

            <button type="submit">Register</button>
        </form>
     );
}
 
export default CompanyRegistration;