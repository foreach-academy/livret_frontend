import { useNavigate } from "react-router-dom";

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
                            <button 
                                className="tertiary-button" 
                                onClick={() => action.onClick(item, navigate)}
                            >
                                {action.label}
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default Tbody;
