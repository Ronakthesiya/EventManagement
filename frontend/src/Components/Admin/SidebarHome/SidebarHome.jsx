// import React from 'react';
// import './SidebarHome.css';

// export const SidebarHome = () => {
//   return (

//       <div className="p-4">
//         <div className="row">
//           <div className="col-xl-6 col-lg-4">
//             <div className="card l-bg-cherry p-3">
//               <div className="card-statistic-3 p-4">
//                 <div className="card-icon card-icon-large"><i className="fas fa-shopping-cart"></i></div>
//                 <div className="mb-4">
//                   <h5 className="card-title mb-0 fs-4" >Current Events</h5>
//                 </div>
//                 <div className="row align-items-center mb-2 d-flex">
//                   <div className="col-8">
//                     <h2 className="d-flex align-items-center mb-0 text-light">
//                       10
//                     </h2>
//                   </div>
//                   <div className="col-4 text-right">
//                     <span>15% students ragistered <i className="fa fa-arrow-up"></i></span>
//                   </div>
//                 </div>
//                 <div className="progress mt-1 " style={{ height: '8px' }}>
//                   <div className="progress-bar l-bg-cyan" role="progressbar" style={{ width: '15%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-6 col-lg-4">
//             <div className="card l-bg-blue-dark p-3">
//               <div className="card-statistic-3 p-4">
//                 <div className="card-icon card-icon-large"><i className="fas fa-users"></i></div>
//                 <div className="mb-4">
//                   <h5 className="card-title mb-0 fs-4">Past Events</h5>
//                 </div>
//                 <div className="row align-items-center mb-2 d-flex">
//                   <div className="col-8">
//                     <h2 className="d-flex align-items-center mb-0 text-light">
//                       35
//                     </h2>
//                   </div>
//                   <div className="col-4 text-right">
//                     <span>35.3% students ragistered <i className="fa fa-arrow-up"></i></span>
//                   </div>
//                 </div>
//                 <div className="progress mt-1 " style={{ height: '8px' }}>
//                   <div className="progress-bar l-bg-green" role="progressbar" style={{ width: '35.3%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-6 col-lg-4">
//             <div className="card l-bg-green-dark p-3">
//               <div className="card-statistic-3 p-4">
//                 <div className="card-icon card-icon-large"><i className="fas fa-ticket-alt"></i></div>
//                 <div className="mb-4">
//                   <h5 className="card-title mb-0 fs-4">All Events</h5>
//                 </div>
//                 <div className="row align-items-center mb-2 d-flex">
//                   <div className="col-8">
//                     <h2 className="d-flex align-items-center mb-0 text-light">
//                       22
//                     </h2>
//                   </div>
//                   <div className="col-4 text-right">
//                     <span>70% students ragistered<i className="fa fa-arrow-up"></i></span>
//                   </div>
//                 </div>
//                 <div className="progress mt-1 " style={{ height: '8px' }}>
//                   <div className="progress-bar l-bg-orange" role="progressbar" style={{ width: '70%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-6 col-lg-4">
//             <div className="card l-bg-orange-dark p-3">
//               <div className="card-statistic-3 p-4">
//                 <div className="card-icon card-icon-large"><i className="fas fa-dollar-sign"></i></div>
//                 <div className="mb-4">
//                   <h5 className="card-title mb-0 fs-4">Students</h5>
//                 </div>
//                 <div className="row align-items-center mb-2 d-flex">
//                   <div className="col-8">
//                     <h2 className="d-flex align-items-center mb-0 text-light">
//                       62
//                     </h2>
//                   </div>
//                   <div className="col-4 text-right">
//                     <span>29.5% of them Ragistered<i className="fa fa-arrow-up"></i></span>
//                   </div>
//                 </div>
//                 <div className="progress mt-1 " style={{ height: '8px' }}>
//                   <div className="progress-bar l-bg-cyan" role="progressbar" style={{ width: '29.5%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };



import React, { useEffect, useState } from 'react';
import './SidebarHome.css';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const SidebarHome = () => {

  const [loading, setLoading] = useState(true);
  
  var [events, setevents] = useState([]);
  var [students, setstudents] = useState([]);
  var colorforblock = ["l-bg-cherry", "l-bg-blue-dark", "l-bg-green-dark", "l-bg-orange-dark"]
  var colorforline = ["l-bg-cyan", "l-bg-green", "l-bg-orange", "l-bg-cyan"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://eventapironak.onrender.com/`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const eventData = await response.json();
        setevents(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await fetch(`https://studentapironak.onrender.com`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const studentData = await response.json();
        setstudents(studentData);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData2();
  }, []);

  var i = 0;
  const formetedEvent =
    events.map((e) => {

      if (new Date(e.eventDate) >= new Date()) {
        i = i + 1;
        return (
          <div className="col-xl-6 col-lg-4">
            <Link to={`/adminhome/studentlistbyevent/${e._id}`} style={{ textDecoration: "none" }}>
              <div className={`card ${colorforblock[i % 4]} p-3`}>
                <div className="card-statistic-3 p-4">
                  <div className="card-icon card-icon-large"><i className="fas fa-users"></i></div>
                  <div className="mb-4">
                    <h5 className="card-title mb-0 fs-4" style={{ display: "block" }}>{e.eventName}</h5>


                  </div>

                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">

                      <h2 className="d-flex align-items-center mb-0 text-light">
                        {e.memberId.length} / {e.noOfSeat}
                      </h2>
                    </div>
                    <div className="col-4 text-right">
                      <span>{parseFloat(e.memberId.length * 100 / e.noOfSeat).toFixed(2)}% students ragistered <i className="fa fa-arrow-up"></i></span>
                    </div>
                  </div>
                  <div className="progress mt-1 " style={{ height: '8px' }}>
                    <div className={`progress-bar ${colorforline[i % 4]}`} role="progressbar" style={{ width: `${e.memberId.length * 100 / e.noOfSeat}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      }
    }
    )



  return (



    <>
      {!loading ? (
        <div className="p-4">
          <div className="row">
            {formetedEvent}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '160vh' }}>
          <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
        </div>
      )}
    </>
  );
};

