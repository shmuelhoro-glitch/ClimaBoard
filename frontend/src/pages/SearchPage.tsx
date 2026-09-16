import { useRef, useState } from "react";
import type { CityDetails } from "../types/weatherResType";
import { getLocationByName } from "../services/weatherService";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [result, setResult] = useState<CityDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const timeoutRef = useRef<number | null>(null);

  function handleChange(value: string) {
    setSearchInput(value);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (value.length > 2) {
        setIsLoading(true);
        setError("");
        try {
          const req: CityDetails[] = await getLocationByName(value);
          setResult(req);
        } catch (err) {
          console.error(err)
          setError("Server intentional error");
        } finally {
          setIsLoading(false);
        }
      }
    }, 400);
    return null;
  }

  return (
    <>
      <div className="searchBox">
        <h2>חיפוש נתוני עיר לפי שם</h2>
        <input
          type="text"
          value={searchInput}
          placeholder="הקלד עיר לחיפוש"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </div>
      {isLoading ? (
        <div className="loading">טוען...</div>
      ) : (
        <ul>
          {result.map((c, i) => (
            <li key={i}>
              <div className="cityDetailsCard">
                <h3>{c.name}</h3>
                <div>
                  <p>latitude {c.latitude}</p>
                  <p>longitude {c.longitude}</p>
                  <p>country {c.country}</p>
                  <Link to={`/app/city/${encodeURIComponent(c.name)}?lat=${c.latitude}&lon=${c.longitude}`}>בחר עיר</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <h2 className="errorMessage">{error}</h2>}
    </>
  );
};

export default SearchPage;
