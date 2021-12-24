import './css/layout.css';
import './css/common.css';

function App() {
    let title = 'dddd';
    return (
        <>
            <header className='header'>
                <div className='headerInner'>
                    <div className='headerLeft'>
                        <a className='headerLogo' href='#'></a>
                    </div>
                    <div className='headerTitle'>{title}</div>
                    <div className='headerRight'>

                    </div>
                </div>
            </header>
            <div className="body">
                <div className="bodyInner">
                    sdfsdf
                </div>
            </div>
            <div className="footer">
                sdfdsf
            </div>
        </>
    );
}

export default App;
