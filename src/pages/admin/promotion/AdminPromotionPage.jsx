import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../../services/PromotionsService";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";

const AdminPromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const fetchAllPromotions = async () => {
    try {
      const response = await PromotionsService.fetchAllPromotions();
      setPromotions(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des promotions:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPromotions = promotions.filter((promotion) =>
    promotion.title.toLowerCase().includes(searchTerm)
  );

  return (
    <AdminLayout>
      <div className="container-admin">
        {/* En-tête de la liste des promotions */}
        <div className="d-flex justify-content-between">
          <h1>Promotions</h1>
          {isAdmin && (
            <button
              className="primary-button"
              onClick={() => navigate("/admin/promotions/add")}
            >
              Ajouter une promotion
            </button>
          )}
        </div>
        {/* Zone de recherche */}
        <Row className="mt-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Rechercher une promotion..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>
        {/* Liste des promotions */}
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Nom</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promotion) => (
              <tr key={promotion.id}>
                <td>{promotion.title}</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/promotions/${promotion.id}`)
                    }
                  >
                    Voir plus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        perferendis in ducimus vitae doloribus officia laborum laudantium
        inventore, quisquam, dignissimos dolorem eligendi temporibus sunt
        delectus? Aliquam dolore accusamus adipisci officia qui deserunt neque
        repudiandae consectetur excepturi et! Perferendis velit ad obcaecati
        aliquid quasi alias laborum, vero quas ipsum, laudantium cupiditate,
        molestiae exercitationem. Vel vero eveniet aperiam quaerat odit officiis
        nisi nulla quos? Reprehenderit molestiae hic eveniet provident
        blanditiis totam maxime id! Minima magni quibusdam ipsam fuga culpa
        similique explicabo et voluptate tempore provident doloremque
        exercitationem, maxime veniam necessitatibus, amet numquam laborum.
        Tempora nemo labore ipsa reiciendis harum tenetur adipisci eos veniam
        quibusdam laboriosam est consequuntur vitae sint pariatur omnis
        dignissimos dicta vero quidem natus delectus enim, nobis sapiente
        incidunt. Magni sequi, vel inventore excepturi, vero quidem doloremque
        natus veniam repudiandae tempore culpa numquam sapiente quisquam earum
        corporis adipisci mollitia vitae laborum aut praesentium voluptate!
        Vitae officiis laudantium id, ipsa in temporibus voluptas, nihil qui
        possimus consectetur hic nobis maiores, quas corporis pariatur
        voluptates amet nostrum aspernatur rem beatae ipsam exercitationem
        consequatur! Mollitia, provident voluptatum ex facere aperiam tempore?
        Eligendi distinctio nesciunt impedit sint deleniti, earum fugiat, non
        incidunt placeat veritatis laudantium sequi porro exercitationem sit?
        Ipsam consequuntur aliquid laboriosam cum est ipsa repellat illo nulla
        provident debitis minus, nam consequatur rem itaque commodi placeat
        laudantium temporibus unde perferendis ea exercitationem eos cupiditate
        magnam. Maxime corporis reiciendis commodi repudiandae, voluptatum fugit
        modi adipisci sed odit doloribus ipsam officia eveniet nesciunt deserunt
        eligendi enim voluptatibus mollitia dignissimos ullam rem. Expedita,
        delectus veritatis. Dolorum, ad non saepe dolor eligendi quas quam
        numquam quidem dolore velit, blanditiis debitis eum adipisci neque iste
        asperiores veritatis deserunt atque doloremque excepturi pariatur
        repellendus. Quas unde nihil, deserunt ipsam quibusdam repellendus omnis
        exercitationem, similique in inventore quam eius eligendi. Et dolorum
        enim placeat quaerat repudiandae reiciendis hic deserunt illum qui
        explicabo voluptatem architecto eveniet libero ipsam doloremque maiores
        dolorem ut aspernatur odio numquam est, quae rem vitae. Sint, totam. Ad
        quae fuga eos perferendis odio sapiente molestiae itaque, explicabo
        dolorem, nam magnam accusamus asperiores blanditiis, error rerum
        tenetur. Mollitia consequuntur quisquam aliquam omnis explicabo
        voluptate quis dicta maxime dolore eius, sit vero temporibus! Similique
        rerum architecto quod velit repellat aspernatur atque ratione quam
        temporibus vitae sequi obcaecati tempora numquam non sint debitis
        reiciendis voluptatem cupiditate neque, distinctio beatae nesciunt quae.
        Reiciendis facere eaque voluptatum similique blanditiis esse explicabo
        exercitationem! Cumque itaque cupiditate est eius aperiam incidunt
        ipsam, aliquam nesciunt quidem cum consectetur iusto enim odio animi
        deleniti quia! Qui tenetur iste, maxime provident deleniti sunt minima
        velit dignissimos, ea molestiae quam dolorum blanditiis. Iste, vero modi
        optio est maiores ex officia tempore dolorum! Ut quaerat, similique
        explicabo suscipit quisquam totam asperiores animi placeat iure, quas
        quod incidunt dolorum amet possimus praesentium tempore ipsam unde
        officiis maiores laboriosam aperiam. Natus aliquid dolorem ratione
        corrupti quis iure beatae sint perferendis accusamus. Sed iusto
        recusandae minus dicta ad. Libero ea distinctio officia accusantium
        quidem fugit quas quaerat atque ipsam reprehenderit vitae nam, deleniti
        itaque quisquam optio necessitatibus eligendi aliquam perferendis
        mollitia animi praesentium unde iste voluptatibus excepturi? Nostrum,
        eos nulla repellat, id dolorem ducimus iusto nemo quisquam eius,
        provident a! Consequuntur aliquam sint maxime doloremque et voluptates
        delectus maiores quo, iure eos asperiores minus sed consequatur ratione.
        Exercitationem, minus voluptate laborum in quae earum error esse odit
        vel beatae doloribus cum modi magni, officia ab eligendi consequatur
        officiis reiciendis similique? Maiores fugiat mollitia praesentium error
        dolorum ipsa animi tenetur illum. Minima, nisi laborum? Excepturi fugiat
        ducimus, voluptas corporis maxime incidunt deserunt illo quasi
        voluptatum reprehenderit possimus officia quia obcaecati neque dolore
        aliquam sed porro sapiente. Sint, quidem tempore! Suscipit, iusto vero.
        Corporis ad fuga obcaecati nisi, ducimus debitis vitae! Vel eos
        asperiores iusto rem reprehenderit eveniet dolore veritatis tenetur modi
        animi quas sit unde perferendis dolorem quo eligendi dolores corporis,
        officiis beatae. Accusamus, modi dolorum itaque debitis iste animi? Odit
        dicta architecto illo hic quasi dolores perferendis cumque, facilis
        aliquid, nisi tempora reprehenderit quae quam nihil rem amet totam
        suscipit vel dolor. Veritatis quos illum, perspiciatis nemo, recusandae
        ipsa hic ullam voluptas id vel magnam aliquam tenetur repudiandae
        repellat facere, adipisci totam nostrum velit dignissimos incidunt eum.
        Mollitia, quo. Saepe rerum repellat voluptates neque dolores harum
        quibusdam fuga, architecto consequatur necessitatibus eos blanditiis
        quod aut perspiciatis possimus fugiat recusandae! Architecto, eveniet
        dolorum. Amet suscipit voluptatem accusamus voluptate ullam illum. Non
        dolore totam aut nulla facere, similique officia quibusdam! Iure culpa
        possimus beatae quaerat soluta aspernatur doloremque, ut fugit itaque
        odio dolore aliquam officia quis sit distinctio nostrum veritatis minima
        perferendis natus quibusdam, tempora nulla quae sapiente ullam. Enim,
        beatae necessitatibus autem fugit consequatur, voluptatibus doloremque
        vero, quam tenetur nulla sequi sit ut? Perferendis hic, ut tempora,
        perspiciatis obcaecati porro nostrum accusantium sit excepturi voluptate
        numquam nesciunt accusamus, minus nobis atque temporibus. Vitae amet,
        vero sed assumenda explicabo eius, sequi facilis earum, aspernatur
        deserunt harum possimus perspiciatis incidunt doloribus accusantium. Cum
        quam quidem explicabo veniam! Eius perspiciatis maiores quam sit alias
        quidem, inventore harum. Illo accusamus minus necessitatibus nemo,
        laborum officiis, sint voluptas nulla itaque, in quasi iusto corporis
        iure dolores suscipit exercitationem repellat? Dolorum nobis numquam
        delectus incidunt, doloribus odit voluptatem aperiam blanditiis nam
        quasi officia accusantium hic sit rem facilis accusamus tempore! Maxime
        voluptatibus ex itaque distinctio impedit dolorem quisquam? Aperiam
        molestias quasi quia laudantium nobis vitae id voluptatem, dicta
        incidunt consequatur nihil excepturi laborum esse aliquam quos in non,
        maxime, saepe rerum blanditiis accusantium dignissimos eos. Voluptatem
        tempora quia mollitia totam, inventore provident quo! Amet nemo quaerat
        harum libero fuga! Illo ut corrupti provident enim totam fugit dolorum
        ab accusamus excepturi dolore architecto consequuntur esse blanditiis
        eius nostrum voluptatem dolorem nihil aspernatur saepe perspiciatis,
        autem tenetur pariatur praesentium ea. Totam, pariatur quisquam enim,
        voluptatibus esse repellat dolores ea accusamus voluptates asperiores,
        recusandae suscipit in voluptate aspernatur officiis magnam amet tempore
        id deleniti corrupti quasi reprehenderit. Consequuntur perferendis illo
        voluptatem consectetur minima molestias voluptas praesentium quidem sed.
        Sed placeat dolorum accusantium earum, exercitationem, vel eaque
        perspiciatis commodi unde itaque nesciunt consequuntur quos fuga quo
        autem sequi reprehenderit animi similique natus!
      </div>
    </AdminLayout>
  );
};

export default AdminPromotionPage;
