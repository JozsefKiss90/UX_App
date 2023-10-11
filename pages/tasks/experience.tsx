import Likert from '../../components/likert';
import resets from '../../components/_resets.module.css';

function Experience() {

  const likertText : any = {
    0: {
      question: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: 0 }}>
            Please indicate your level of experience<br />with Microsoft Excel
          </p>
          <img 
            src="/images/excel.png" 
            alt="Microsoft Excel" 
            style={{ width: '50px', height: '50px', marginLeft: '10px' }} 
          />
        </div>
      ),
      ranking: ["Never used", <>I use it almost <br /> every day</>]
    },
    1: {
      question: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: 0 }}>
            Please indicate your level of experience<br />with Google Sheets
          </p>
        </div>
      ),
      ranking: ["Never used", <>I use it almost <br /> every day</>]
    },
    2: {
      question: (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
          <p style={{ margin: 0 }}>
            On a scale of 1 to 5, please rate your proficiency level
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>in spreadsheet apps&nbsp;</p>
          </div>
        </div>
      ),
      ranking: ["Beginner", "Expert"]
    },
    3: {
      question: (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ display: 'inline-block', margin: 0 }}>
            How would you describe your experience <br /> with the decimal increase / decrease button?
          </p>
        </div>
      ),
      ranking: ["Very confusing", "Seamless"]
    }
  }

  return (
    <div className={`${resets.storybrainResets}`}>
      <Likert likertText={likertText} />
    </div>
  );
}

export default Experience;
