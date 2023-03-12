
import '../App.css';
import { Axios } from 'axios';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'




function Home() {
  const [cityName, setcityName] = useState('')
  const [date, setdate] = useState('')
  const [dataArray, setdataArray] = useState([])
  const [hotelArray, sethotelArray] = useState([])
  const [airportName, setairportName] = useState('')
  const [sourceAirport, setsourceAirport] = useState('PNQ')
  const [destinationAirport, setdestinationAirport] = useState('BOM')
  const [flightInfo, setflightInfo] = useState([])

  const options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
    params: {name: cityName, search_type: 'ALL'},
    headers: {
      'X-RapidAPI-Key': '67c7b2657fmshd8e0371d87f8327p166610jsn02568537f552',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };
  
  


  const airportCode = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: {q: cityName,},
    headers: {
      'X-RapidAPI-Key': 'da2618650fmsh0030b1531524283p1baa01jsn42574f1c8227',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    }
  };
  

  const flights = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/flights/create-session',
    params: {o1: 'PNQ', d1: destinationAirport, dd1: '2023-03-20', currency: 'USD', ta: '1', c: '0'},
    headers: {
      'X-RapidAPI-Key': 'da2618650fmsh0030b1531524283p1baa01jsn42574f1c8227',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  // const options = {
  //   method: 'GET',
  //   url: 'https://travel-advisor.p.rapidapi.com/airports/search',
  //   params: {query: cityName, locale: 'en_US'},
  //   headers: {
  //     'X-RapidAPI-Key': 'da2618650fmsh0030b1531524283p1baa01jsn42574f1c8227',
  //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  //   }
  // };
  // const options1 = {
  //   method: 'GET',
  //   url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
  //   params: {
  //     origin: 'LOND',
  //     destination: 'NYCA',
  //     date: '<REQUIRED>',
  //     adults: '1',
  //     currency: 'USD',
  //     countryCode: 'US',
  //     market: 'en-US'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'da2618650fmsh0030b1531524283p1baa01jsn42574f1c8227',
  //     'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
  //   }
  // };
  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data[0].itemName);
      sethotelArray(response.data[0].itemName)
    }).catch(function (error) {
      console.error(error);
    });
  
    
  }, [])
  axios.request(flights).then(function (response) {
    console.log("Flight data "+response.data);
  }).catch(function (error) {
    console.error(error);
  });
  // axios.request(airportCode).then(function (response) {
  //   console.log("Airport code "+ response.data.items[0].iata);
  // }).catch(function (error) {
  //   console.error(error);
  // });
  
  const submitButton = async (e) =>{
    e.preventDefault();
    console.log(cityName);

    axios.request(airportCode).then(function (response) {
      console.log("Airport code "+ response.data.items[0].iata);
      setdestinationAirport(response.data.items[0].iata)
    }).catch(function (error) {
      console.error(error);
    });

    axios.request(options).then(function (response) {
      console.log(response.data);
      setdataArray(response.data[0].itemName);
    }).catch(function (error) {
      console.error(error);
    });

    axios.request(flights).then(function (response) {
      console.log("Flight data "+response.data);
      setflightInfo(response.data)
    }).catch(function (error) {
      console.error(error);
    });


  
    // axios.request(options1).then(function (response) {
    //   console.log("flight details "+response.data);
      
    // }).catch(function (error) {
    //   console.error(error);
    // });
    //   console.log("Submit button");
    //   // axios.request(options).then(function (response) {
    //   //   console.log(response.data);
    //   //   setdataArray(response.data);
    //   // }).catch(function (error) {
    //   //   console.error(error);
    //   // });
      

    //   axios.request(options).then(function (response) {
    //     console.log(response.data[0]);
    //     setairportName(response.data[0].code)

      

    //   }).catch(function (error) {
    //     console.error(error);
    //   });

      

      // getFlightDetails();
  }
 

  // const getFlightDetails = async (e)=>{
  //   e.preventDefault();

  //   axios.request(options1).then(function (response) {
  //     console.log("flight details function "+response);
      
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }
console.log(airportName);
console.log(flightInfo);
console.log(dataArray);
  
  
  return (
    <>


      <div className = "bgContainer">
        <div className = "navbar col-12 row-2 shadow flex">
          <div className="col-1 row-12 py-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" viewBox="0 0 256 262"><path fill="#7950ED" d="M0 130.519c0 67.317 49.315 122.613 112.77 130.34V.178C49.314 7.904 0 63.2 0 130.519Zm256-.006C256 62.853 206.18 7.213 142.053 0v261.199h113.78v-127.08c.167-1.201.167-2.403.167-3.606Z"/></svg>
          </div>
          <div className="col-11 row-12  text-orange-900 text-6xl " >TripSurfer</div>
         
        </div>

        <div className="col-12 row-6  px-64 py-4 ">
         <div className="col-12 row-12 bg-orange-300 travelBg shadow-2xl">
          <div className="col-12 row-5"></div>
            <div className="col-12 row-2 bg flex">
              <div className = "col-6 row-12 flex">
                <div className="col-3 row-12 ">
                  
                </div>
                <div className="col-9 row-12  py-3 px-2">
                <input onChange={(e) => setcityName(e.target.value)} placeholder="Destination" className='rounded-lg  col-12 row-12 p-4 border-t mr-0 text-gray-800 border-gray-200 bg-white'/>
                </div>
                  
              </div>
              <div className = "col-6 row-12  flex">
              <div className="col-9 row-12 py-3 px-2">
                <input placeholder="DD-MM-YYYY" onChange={(e) => setdate(e.target.value)} className='rounded-lg  col-12 row-12 p-4 border-t mr-0 text-gray-800  border-gray-200 bg-white '/>
                </div>
                <div className="col-3 row-12 ">
                  
                  </div>
              </div>
            </div>
            <div className=" col-12 row-2 flex">
              <div className=" col-4 row-12"></div>
              <div className=" col-4 row-12 px-4 py-3">
                <div className=" col-12 row-12 centreElement flex">
                  
                     <button onClick={submitButton} class="bg-purple-800 hover:bg-blue-700 text-white font-bold h-8 py-0 px-4 rounded-full">
                         Find
                     </button>
                </div>
              </div>
              <div className=" col-4 row-12"></div>
            </div>
            <div className=" col-12 row-3"></div>
         </div>
        </div>
        <div className="col-12 row-4  flex">
          <div className="col-2 row-12 "></div>
          <div className="col-8 row-12   flex">
            
            {/* <div className="card col-4 row-12 bg-gray-300 rounded shadow hover:shadow-xl"></div>
            
            <div className="card col-4 row-12 bg-gray-300 rounded shadow hover:shadow-xl"></div> */}
            <div className="col-4 row-12 p-8 ">
            <Link to="/hotels" state={{ from: [cityName,date] }}>  <div className="no-underline col-12 row-12 secondBg bg-white rounded shadow hover:shadow-xl ">
                
              <div className = "col-12 row-12 bg-gray-300 hover:opacity-0 ">
                  <div className="col-12 row-8 rounded-md">
                    <div className="col-12 row-12 hotelImg bg-orange-100 rounded-md"></div>
                  </div>
                  <div className="col-12 row-4  p-3 text-white no-underline">
                    <div className="col-12 row-12 no-underline ">
                      {dataArray}
                    </div>
                  </div>
              </div>
              </div>
              </Link>

            </div>
            <div className="col-4 row-12  p-8">
           <Link to ="/hotels"> <div className=" col-12 row-12 bg-white rounded shadow hover:shadow-xl ">
                
                <div className = "col-12 row-12 bg-gray-300 hover:opacity-0 ">
                    <div className="col-12 row-8 rounded-md">
                      <div className="col-12 row-12 flightImg bg-orange-100 rounded-md"></div>
                    </div>
                    <div className="col-12 row-4  p-3">
                      <div className="col-12 row-12 ">
                        {/* {dataArray} */}
                      </div>
                    </div>
                </div>
                </div>
                </Link>
            </div>
            <div className="col-4 row-12  p-8">
            <div className=" col-12 row-12 bg-white rounded shadow hover:shadow-xl ">
                
                <div className = "col-12 row-12 bg-gray-300 hover:opacity-0 ">
                    <div className="col-12 row-8 rounded-md">
                      <div className="col-12 row-12 TravelImg bg-orange-100 rounded-md"></div>
                    </div>
                    <div className="col-12 row-4  p-3">
                      <div className="col-12 row-12 ">
                        {/* {dataArray} */}
                      </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
          <div className="col-2 row-12 0"></div>
        </div>
      </div>


      
    </>
  );
}

export default Home;
