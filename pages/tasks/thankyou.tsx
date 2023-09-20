import Image from "next/image"

const Thankyou = () => {
    return(
        <div style={{position:'relative', top:'100px', left:'20%'}}>
            <h3 style={{fontSize:'1.5rem', margin:'0'}}>
                We are sincerely grateful; you made the day brighter for two tech-savvy psychologists.
            </h3>    
            <div style={{display:"flex", flexDirection:"row", alignItems: 'center', padding:'10px 0 15px 0'}}>
                <img style={{width:'100px', height:'100px'}} src="/images/goku.png" alt="" />
                <p style={{fontSize:'1.5rem', marginTop: '40px'}}>
                    Bálint K. &nbsp;
                </p>
                <p style={{fontSize:'1.5rem', marginTop: '40px'}}>
                    <a style={{color: '#b300ff'}} href="">(idea, experiment design)</a>
                </p>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{width:'100px', height:'100px', marginLeft:'5px'}} src="/images/vegeta.png" alt="" />
                <p style={{fontSize:'1.5rem', marginTop: '40px'}}>
                    József K. &nbsp;
                </p>
                <p style={{fontSize:'1.5rem', marginTop: '40px'}}>
                    <a style={{color: '#b300ff'}} href="">(front end dev, experiment design)</a>
                </p>
            </div>
        </div>
    )
}

export default Thankyou