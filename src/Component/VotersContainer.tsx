import { SideBar } from './SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ElectionOnHold } from './ElectionOnHold';
import { ElectionResults } from './ElectionResults';
const electionData = {
    categoryOne: [
        { name: "Alice Johnson", votes: 1200 },
        { name: "Bob Smith", votes: 950 },
    ],
    categoryTwo: [
        { name: "Carol Williams", votes: 800 },
        { name: "David Brown", votes: 650 },
    ],
    categoryThree: [
        { name: "Eve Davis", votes: 400 },
        { name: "Frank Miller", votes: 350 },
    ],
};
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};
export const VotersContainer = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [showElectionHold, setShowElectionHold] = useState(false)
    const [showElectionResult, setShowElectionResult] = useState(false)
    const capitalizeFirstLetter = (string: any) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const username = capitalizeFirstLetter(localStorage.getItem('username'));
    useEffect(() => {
        if (!token) {
            toast.error("Your time has lapsed please login")
            navigate('/')
        }
    }, [token])
    console.log(token)
    const [showOutlet, setShowOutlet] = useState(false);
    const [election, setElection] = useState<any>([]);
    const location = useLocation();
    const isMobile = useIsMobile();
    console.log('outlet', <Outlet />)
    useEffect(() => {
        const handleEletion = async () => {
            try {
                const res = await fetch(`https://foursquarevgc-election-api.onrender.com/elections`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                })
                const result = await res.json();
                setElection(result);
            } catch (error) {
                console.log(error)
            }
        }
        handleEletion();
    }, [])
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("GroupAId");
        localStorage.removeItem("GroupBId");
        localStorage.removeItem("GroupCId");
        window.location.href = "/";
    };
    console.log("the election is", election)
    console.log("the election is", election)
    const start_time = `2024-08-22T22:00:00.000Z`
    // const start_time = election[0]?.start_time
    console.log('start time is here', start_time)
    const stop_time = election[0]?.stop_time
    console.log(new Date(start_time))
    console.log(new Date(stop_time))
    useEffect(() => {
        if (start_time === "2024-08-22T22:00:00.000Z" ) {
            setShowElectionHold(false)
            setShowElectionResult(false)
        }
        else if (new Date(stop_time)) {
            setShowElectionResult(true)
            setShowElectionHold(false)
        }
        else {
            setShowElectionHold(false)
            setShowElectionResult(false)
        }
    }, [new Date(start_time), new Date(stop_time)])



    console.log('election on container page', election)

    useEffect(() => {
        setShowOutlet(location.pathname !== "/votes");
    }, [location]);

    const isGroupRoute = ["/votes/GroupA", "/votes/GroupB", "/votes/GroupC"].includes(location.pathname);

    return (
        <div className='w-screen h-screen relative z-40 h-[100dvh]'>
            {
                showElectionHold && (
                    <ElectionOnHold start_time={start_time} stop_time={stop_time} />
                )
            }
            {
                showElectionResult && (
                    <ElectionResults results={electionData} />
                )
            }
            <ToastContainer />
            {/* Desktop Layout */}
            <div className='w-screen h-screen flex xl:flex hidden'>
                <div className='w-screen h-screen xl:flex hidden flex'>
                    <div className='xl:w-[22%] w-full sidebarbackground h-screen bg-white'>
                        <SideBar />
                    </div>
                    <div className='xl:w-[78%] h-screen text-black bg-white'>
                        <Outlet context={election} />
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className='h-full w-full xl:hidden'>
                {!isGroupRoute && (
                    <div className='flex md:pt-[4.5rem] nesthub-full pt-[3rem] md:gap-[3rem] gap-[2rem] flex-col'>
                        <div className='flex items-center h-full justify-center nexthub_1 md:gap-[7vw] gap-[15vw] flex-col'>
                            <div>
                                <img
                                    src="/asset/Images/weblogo.png"
                                    alt="mOA"
                                    className='xl:w-[14vw] w-[46vw] md:w-[44vw] asolute md:-top-[15vw] xl:top-0 xl:relative'
                                />
                            </div>
                            <div className='text-[#9C9C9C] xl:text-[43px] text-[5.5vw] md:text-[5vw] fonts-small font-black flex gap-2'>
                                <span className='text-[#0250FC] fonts-mid'>Welcome,</span>
                                <span>{username}</span>
                            </div>
                        </div>
                        <div className='w-[85%] group_but md:w-[74%] pt-[1rem] mx-auto flex flex-col md:gap-4 gap-2'>
                            <div className='fonts-mid text-[4.3vw]'>Select a category to vote</div>
                            <div className='flex flex-col md:gap-10 gap-5'>
                                <Link to="GroupA" className='bg-[#0250FC] group_button fonts-small font-extrabold rounded-[10px] flex items-center text-white text-[4.7vw] tracking-[4px] justify-center w-[100%] md:h-[9vh] mx-auto h-[8vh]'>
                                    <button>Category A</button>
                                </Link>
                                <Link to="GroupB" className='bg-[#0250FC] group_button fonts-small font-extrabold rounded-[10px] flex items-center text-white text-[4.7vw] tracking-[4px] justify-center w-[100%] md:h-[9vh] mx-auto h-[8vh]'>
                                    <button>Category B</button>
                                </Link>
                                <Link to="GroupC" className='bg-[#0250FC] group_button rounded-[10px] fonts-small font-extrabold flex items-center text-white text-[4.7vw] tracking-[4px] justify-center w-[100%] md:h-[9vh] mx-auto h-[8vh]'>
                                    <button>Category C</button>
                                </Link>
                            </div>
                        </div>
                        <div className='items-center justify-center flex'>
                            <div className='bg-[#F94040] cursor-pointer rounded-[6px] group_buttonlogout absolute bottom-8 text-white md:h-[7.6vh] h-[6vh] text-[4.1vw] rounded-[10px] items-center justify-center flex w-[50%] mx-auto'>
                                <button onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conditionally render Outlet on mobile */}
                <div className={`absolute w-full z-50 inset-0 bg-white h-full ${showOutlet ? 'slide-in' : 'hidden'}`}>
                    {(!isMobile || isGroupRoute) && <Outlet />}
                </div>
            </div>



            <div className='flex items-center line_suf justify-center'>
                <div className="h-[1vw] mx-[1.5vw] md:hidden block w-[40%] z-10 relative -top-2 md:-top-4 mx-auto rounded-[4px] bg-black"></div>
            </div>
        </div>
    );
};