import { useEffect, useState } from "react";
import styles from "./App.module.css";
import charlie from "./assets/charlie.png";
import hello from "./assets/hello.svg";
import languageData from "./assets/language/language.json";

function App() {
  const [nightMode, setNightMode] = useState(getSavedNightMode() || false);
  const [language, setLanguage] = useState(getSavedLanguage() || "en");
  const content = languageData[language];

  useEffect(() => {
    // Save night mode and language to local storage
    localStorage.setItem("nightMode", JSON.stringify(nightMode));
    localStorage.setItem("language", language);
  }, [nightMode, language]);

  function getSavedNightMode() {
    // Retrieve night mode from local storage
    return JSON.parse(localStorage.getItem("nightMode"));
  }

  function getSavedLanguage() {
    // Retrieve language from local storage
    return localStorage.getItem("language");
  }

  function toggleNightMode() {
    setNightMode((prevNightMode) => !prevNightMode);
  }

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
  }

  return (
    <>
      <div
        className={`${styles.container} ${nightMode ? styles.nightMode : ""}`}
      >
        <div className={styles.info_page}>
          <div className={styles.header_ul}>
            <div className={styles.darkLanguage}>
              {/* Night Mode Toggle */}
              <button
                className={styles.nightModeToggle}
                onClick={toggleNightMode}
              >
                {nightMode ? "Dark Mode" : "Light Mode"}
              </button>

              {/* Language Changer */}
              <div className={styles.languageChanger}>
                <select
                  className={styles.select}
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                  <option value="uz">Uzbek</option>
                </select>
              </div>
            </div>

            <ul>
              <li>{content.aboutMe}</li>
              <li>{content.skills}</li>
              <li>{content.project}</li>
              <li>{content.contact}</li>
            </ul>
          </div>
          <div className={styles.content_part}>
            <div className={styles.leftPart}>
              <h3>
                <span>
                  <img src={hello} alt="hello" />
                </span>
                {content.greeting}
              </h3>
              <p>{content.description}</p>
              <div className={styles.buttons}>
                <button>{content.hireMe}</button>
                <button>{content.seeMyProject}</button>
              </div>
            </div>
            <div className={styles.rightPart}>
              <img src={charlie} alt="charlie" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
