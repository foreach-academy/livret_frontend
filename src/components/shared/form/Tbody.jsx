import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Tbody = ({ data, columns, action }) => {
    const navigate = useNavigate();


    return (
        <tbody>
            {data.map((item, index) => (

                <tr key={index}>
                    {columns.map((col, index) => (
                        <td key={index} className={`bg-fe-${item[col.label]?.[col.subkey]?.toLowerCase()}`}>
                            {col.render
                                ? col.render(item)
                                : col.subkey
                                    ? item[col.label]?.[col.subkey]
                                    : item[col.label]
                            }
                        </td>
                    ))}
                    {action && (
                        <td className="d-flex justify-content-center">
                            <Button
                                className={action.className}
                                setAction={() => navigate(`${action.url}/${item.id}`)}
                                buttonTitle={action.label}
                            />
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default Tbody;