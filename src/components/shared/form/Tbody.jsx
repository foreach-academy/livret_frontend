import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Tbody = ({ data, columns, action }) => {
    const navigate = useNavigate();

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    {columns.map((col) => (
                        <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
                    ))}
                    {action && (
                        <td className="d-flex justify-content-center">
                            <Button
                                className="bg-fe-blue"
                                setAction={() => navigate(`${action.url}/${item.id}`, navigate)}
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
