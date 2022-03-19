import React, { useState, useEffect } from 'react';
import { table } from 'react-bootstrap'

const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    console.log(list);
    if (list) {
        console.log(JSON.parse(localStorage.getItem("lists")));
        return JSON.parse(localStorage.getItem("lists"));
    } else {
        return [];
    }
};


export function Main() {
    const [arr, setArr] = useState(getLocalItems());
    const [data, setData] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [edit, setEdit] = useState(null);
    //const [searchInput, setSearchInput] = useState('');
    //const [filteredResults, setFilteredResults] = useState([]);

    const [show,setShow] = useState(true)

    const getData = (e) => {

        setData(e.target.value);
    };
    const getLname = (e) => {

        setLname(e.target.value);
    };
    const getEmail = (e) => {
        setEmail(e.target.value);
    };
    const deleteME = (id) => {
        const filteredArray = arr.filter((ele) => ele.id != id);

        setArr([...filteredArray]);
    };

    const onChangeHandle= (e) => {
        console.log("e.target.value", e.target.value);
        if (e.target.value == '') {
            window.location.reload(true);
            const tempArr = arr;
            setArr(tempArr)
            return
        }
        const searchResult = arr.filter(item => item.data.toLowerCase().startsWith(e.target.value.toLowerCase()) || item.lname.toLowerCase().startsWith(e.target.value.toLowerCase()) || item.email.toLowerCase().startsWith(e.target.value.toLowerCase()))
        setArr(searchResult);
    }


    const getEdit = (id) => {
        const newEdit = arr.find((ele) => {
            return ele.id === id;
        })
        console.log(newEdit);
        setToggleSubmit(false);
        setData(newEdit.data);
        console.log(newEdit.data);
        setLname(newEdit.lname);
        setEmail(newEdit.email)
        setEdit(id);
    };

    
    const arrCon = () => {
        if (!data || !lname || !email) {
            alert("please fill data")
        } else if (data && !toggleSubmit) {
            setArr(
                arr.map((ele) => {
                    if (ele.id === edit) {
                        console.log('I am matched ');
                        return { ...ele, data, lname, email }
                    }
                    return ele;
                    console.log(ele);
                })
            );

            setToggleSubmit(true);
            setData('');
            setLname('');
            setEmail('');
            setEdit(null);
        } else {
        const id = btoa(Math.random().toString()).substr(10, 5);
        setArr([...arr, { data, lname, email, id }]);
        setData('');
        setLname('');
        setEmail('');
        
        }

    };

    /*const searchItems = (id) => {
        setSearchInput(id)
        if (searchInput !== '') {
            const filteredData = arr.filter((ele) => {
                return Object.values(ele).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(ele)
        }
    }*/
    
    useEffect(() => {
        
        localStorage.setItem("lists", JSON.stringify(arr));
    }, [arr]);

   


    return (
        <div className="head">
            
            <div style={{ textAlign: "center" }}>
                <input type="text"  placeholder="Search" onChange={onChangeHandle} />
                <button type="button" class="btn btn-success" onClick={() => setShow(!show)}>Add User</button>
                <br />
                
            </div>
            {
                show ?<form className="col md-3">
                    <div class="form-group" id="inputdata">
                    <label class="col-sm-2 col-form-label">First_Name:</label>
                    <input placeholder="Enter your first name" onChange={getData} value={data}/>
                <br />
                    <label class="col-sm-2 col-form-label">Last_Name:</label>
                    <input type="text" placeholder="Enter your Last name" onChange={getLname} value={lname} />
                <br />
                    <label class="col-sm-2 col-form-label">Email_Id:</label>
                    <input type="text" placeholder="Enter your email-id" onChange={getEmail} value={email} />
                <br />
                {
                        toggleSubmit ? <button type="button" class="btn btn-success" onClick={arrCon}>Add User</button> :
                            <button type="button" class="btn btn-primary" onClick={arrCon}>Update</button>
                }
                    </div>
                    </form>: null
            }
                <div className="table1">
                <table class=" table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email-id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {arr.map((ele) => (
                    <tbody>
                        <tr key={ele.id}>
                            <th scope="row">-</th>
                            <td>{ele.data}</td>
                            <td>{ele.lname}</td>
                            <td>{ele.email}</td>
                                <button type="button" class="btn btn-warning" onClick={() =>  getEdit(ele.id)}>Edit</button>
                                &nbsp;
                                <button type="button" class="btn btn-danger" onClick={() => deleteME(ele.id)}>Delete</button>
                        </tr>
                        </tbody>
                    ))}
                </table>
                    
                </div>
            </div>
            
    )
}

export default Main