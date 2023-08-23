import Likert from '../../components/likert';
import resets from '../../components/_resets.module.css';

function Experience() {

  const likertText = {
      0 : {
        question :  (
          <div className="question-container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>
                Please indicate your level of experience<br />with Microsoft Excel
              </p>
              <img src="/images/excel.png" alt="Microsoft Excel" style={{ width: '50px', height: '50px', position:"absolute",
            left:'330px', top:"50px"}} />
            </div>
          </div>
        ),
        ranking : ["Never used",  <>I use it almost <br /> every day</>]
      },
      1 : {
        question : 
        <div className="question-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: 0 }}>
              Please indicate your level of experience<br />with Google Sheets
            </p>
            <img src="/images/sheets.png" alt="Microsoft Excel" style={{ width: '50px', height: '50px', position:"absolute",
           left:'330px', top:"50px"}} />
          </div>
        </div>,
        ranking : ["Never used",  <>I use it almost <br /> every day</>]
      },
      2 : {
        question :  
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <p style={{ margin: 0 }}>
                On a scale of 1 to 5, please rate your proficiency level 
              </p>
              <div style={{ display: 'flex', flexDirection: "row" }}>
                <p>
                  in spreadsheet apps&nbsp; 
                </p>
                <p>
                  (eg.:&nbsp; 
                </p>
                <img src="/images/excel.png" alt="Microsoft Excel" style={{ width: '50px', height: '50px' }} />
                <p>
                  or&nbsp; 
                </p>
                <img src="/images/sheets.png" alt="Microsoft Excel" style={{ width: '50px', height: '50px' }} />
                <p>
                  )
                </p>
              </div>
            </div>
          </div>
        </div>,
        ranking : ["Beginner", "Expert"]
      },
      3 : {
        question: (
          <div>
            Have you ever experienced confusion with the decimal increase / decrease button (&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ) in the past?
            <img
              src="/images/buttons.png"
              alt="Decrease / Increase Button"
              style={{ width: '90px', height: '90px', position:"relative", top:"33px", right: '450px' }}
            />
          </div>
        ),
        ranking : ["Never", "Always"]
      }
  }

  return (
    <div className={`${resets.storybrainResets}`}>
      <Likert likertText = {likertText}/>
    </div>
  );
}

export default Experience;
