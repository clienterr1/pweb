import axios from 'axios'
import React, { useEffect, useState } from 'react'

// react router dom
import { Link, useParams } from 'react-router-dom'

// components
import VideoCard from '../../components/VideoCard';

// api
import { getVideos } from '../../constant/api';

// react paginate
import ReactPaginate from 'react-paginate';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);

    const { query } = useParams();

    const getVideo = async (url) => {
        let { data } = await axios(url);
        if (data?.videos) {
            setVideos(data?.videos);
        }
    }

    const handlePageChange = ({ selected }) => {
        setVideos([]);
        setcurrentPage(selected + 1);
        getVideo(getVideos({ query, page: selected + 1 }));
    };

    useEffect(() => {
        return getVideo(getVideos({ query, page: currentPage }));
    }, [query, currentPage])
    return (
        <div className='p-2 bg-[#151B20] h-full'>
            <div className="flex items-center justify-between">
                <h2 className='font-bold text-white text-xl mb-4 capitalize'>{query} Videos</h2>
                <Link className='block text-[#ff7b00] font-semibold' to="/videos">More <i className="text-sm fa fa-angle-double-right"></i></Link>
            </div>
            <div className="flex flex-wrap mb-5 overflow-hidden">
                {videos?.map(item => (
                    <Link to={`/watch/${item?.id}`} title={item?.title} key={item?.id} className='block px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3  xl:w-1/4'>
                        <VideoCard
                            thumbnail={item?.default_thumb?.src}
                            duration={item?.length_min} rate={item?.rate}
                            views={item?.views}
                            date={item?.added}
                            title={item?.title}
                            route={item?.route}
                        />
                    </Link>
                ))}
                {/* {videos?.length !== 0 && } */}
            </div>
            <ReactPaginate
                pageCount={100}
                pageRange={10}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={'bg-transprent px-4 py-3 flex items-center justify-between  sm:px-6'}
                previousLinkClassName={'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-[#e68d07] bg-[#333] hover:bg-[#222]'}
                breakClassName={'bg-[#222] border-gray-600 rounded text-gray-300 hover:bg-[#333] relative inline-flex items-center px-4 py-2 border text-sm font-medium'}
                nextLinkClassName={'ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-[#e68d07] bg-[#333] hover:bg-[#222]'}
                pageClassName={'bg-[#222] border-gray-600 rounded text-gray-300 hover:bg-[#333] relative inline-flex items-center px-4 py-2 border text-sm font-medium'}
                disabledClassName={''}
                activeClassName={'z-10 !bg-[#e68d07] !text-[#222] border-[#e68d07]'}
            />
        </div>
    )
}

export default Home
