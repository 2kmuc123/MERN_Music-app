import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import jwtDecode from 'jwt-decode'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Loser from './music/Loser.mp3'
import cookies from 'universal-cookie'


const Dashboard = () => {
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const [src, setSrc] = useState('')
    const [name, setName] = useState('Múc')


    const authCheck = () => {
        const token = window.localStorage.getItem('token')
        if (token) {
            const auth = jwtDecode(token)
            if (!auth) {
                window.localStorage.removeItem('token')
                alert('Vui Lòng Đăng Nhập !!!')
                window.location.href = '/login'
            } else {
                setUser(auth.name)
            }

        } else {
            alert('Vui Lòng Đăng Nhập !!!')
            window.location.href = '/login'
        }
    }

    const handleLogout = () => {
        const cookie = new cookies()
        window.confirm('Đăng Xuất Khỏi Trái Đất !!!')
        cookie.remove('token')
        window.location.href = '/login'
    }

    const loadData = () => {
        const cookie = new cookies()

        fetch(`${process.env.REACT_APP_API}/music`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${cookie.get('token')}`
            },
            credentials: 'same-origin'

        })
            .then(data => {
                if (data.status === 500) {
                    console.log(data.json());
                    window.location.href = '/login'
                } else {
                    return data.json()
                }
            }
            )
            .then(data1 => {
                setData(data1)
            })
    }

    const handleSelect = (e) => {
        e.preventDefault()
        const choseData = e.target.value;
        setSrc(choseData);
        console.log(src);
    }

    useEffect(() => {
        //authCheck()
        loadData()
    }, [])





    return (
        <div className='full'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="btn btn-outline-success mx-auto" onClick={handleLogout} >{user ? user : 'Đăng Xuất'}</button>
            </nav>
            <div className="container">
                <div className="row justify-content-center headT ">
                    <div className="col-md-7 shadow p-2 mb-4 bg-white rounded">
                        <div className="card border border-success border-radius BgCard">
                            <div className="p-3" style={{ 'overflow': 'auto', 'height': '430px' }}>
                                {data.map((data) => (
                                    <div key={data._id} className="list_music_div">
                                        <div className='row py-2'>
                                            <div className=' col-lg-3 mx-auto'>
                                                <img src={data.image} alt="" width='100px' height='100px' style={{ 'borderRadius': '50%' }} />
                                            </div>
                                            <div className='col-md-7 my-auto'>
                                                <button className='h2 list_music_button' onClick={e => handleSelect(e)} value={data.src}>
                                                    {data.name}
                                                </button>
                                                <br />
                                                <button className='h5 list_music_button' onClick={e => handleSelect(e)} value={data.src}>
                                                    {data.author}
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-center' style={{ 'color': '#ffff' }}>{name}</h1>
                    </div>
                    <div className="container-audio">
                        <AudioPlayer
                            autoPlay
                            src={Loser}
                            onPlay={e => console.log("onPlay")}
                        // other props here
                        />

                    </div>
                </div >
            </div >
        </div >
    )
}

export default Dashboard