import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import './HomePage.css';
import axios from '../../api/axios';
import Table from 'react-bootstrap/Table';

const {RangePicker } = DatePicker;
const Sales_URL = 'Sales';

const HomePage = () => {

    const [sales, setSales] = useState(null);
    const [dates, setDates] = useState([])
    console.log(dates)
    const columns = [
        {
          title: 'ID',
          dataIndex: 'Id',
          key: 'Id',
        },
        {
          title: 'Customer',
          dataIndex: 'CustomerId',
          key: 'CustomerId',
        },
        
      ];

   
    const handleGetSales = async () => {
        if (dates[0] != '' && dates[1] != '') {
            try {
            
                const response = await axios.get(Sales_URL + "/"+String(dates[0]) + "/" +String(dates[1])  
                    
                );
                console.log(JSON.stringify(response?.data));
                setSales(response?.data);
               
            } catch (err) {
                
            }
        }

        
    }

    return (
        <>
        <div className='main-page'>
          <h1 style={{ margin: 20 }} >Sales Page</h1>
          <h3 style={{ margin: 20 }} >Select date range</h3>
        <div  style={{ margin: 20 }}>
                    < RangePicker 
                        onChange={(values) => {
         
                            setDates(values.map(item => {
                                return moment(item).format('YYYY-MM-DD')
                            }));
                            
                             
                          }}
                
            />
            <button  id="sub_butt"  onClick={handleGetSales}>Show </button>
                </div>
                
           
                
          
          {sales &&
            <div >
              <table  striped bordered hover size="md">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(sales).map((r) => (
                    <tr>
                  <td>{r.Id}</td>
                  <td>{r.Customer.FirstName}</td>
                  <td>{r.Customer.LastName}</td>
                  <td>{r.Customer.Email}</td>
                  <td>{r.Customer.PhoneNumber}</td>
                  <td>{r.Product.Name}</td>
                  <td>{r.Product.Price}</td>
                  <td>{r.Date}</td>
                </tr>
               
                    
              ))}
                   </tbody>
            </table>
              </div>
                  }
    </div >
    </>
    );
};

export default HomePage;