import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/notebox-logo.png'

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    
    return ( 
        <div>
            <nav>
                <img src={logo} alt="NoteBox" className='logo' />
                <div className='links'>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create New Note</Link>
                </div>

                {/*Responsive Nav links */}
                <div className='mob-menu'>
                    <i onClick={() => { setToggle(prev => !prev) }} className='material-symbols-outlined'>
                        { toggle ? 'close' : 'menu_open'}
                    </i>
                    <div className={`${toggle ? 'visible' : 'not-visible' }`}>
                        <ul>
                            <li>
                                <Link to="/" onClick={() => setToggle(false)} >Home</Link>
                            </li>
                            <li>
                                <Link to="/create" onClick={() => setToggle(false)} >New Note</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}
 
export default Navbar;