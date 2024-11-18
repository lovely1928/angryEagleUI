import React from "react";
const experiencData = [
  {
    name: "Backend Engineering",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
              delectus, accusamus beatae corporis, quidem error est esse cum
              magni quam voluptates laboriosam laudantium qui veritatis odio sed
              labore, minus voluptatem! Sit deleniti in, deserunt cum quae fuga
              adipisci, eaque error neque itaque repellat aspernatur impedit
              beatae atque nemo pariatur voluptates. Eaque impedit, ipsa autem
              tenetur totam ab expedita nobis harum quos eveniet quis non ipsam
              voluptate dicta qui nam quam! Corporis repellendus velit esse
              debitis ratione animi mollitia! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laborum quasi praesentium cum. Est
              nulla repellat quisquam sit, vitae consequuntur quam?`,
  },
  {
    name: "Frontend Engineering",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
              delectus, accusamus beatae corporis, quidem error est esse cum
              magni quam voluptates laboriosam laudantium qui veritatis odio sed
              labore, minus voluptatem! Sit deleniti in, deserunt cum quae fuga
              adipisci, eaque error neque itaque repellat aspernatur impedit
              beatae atque nemo pariatur voluptates. Eaque impedit, ipsa autem
              tenetur totam ab expedita nobis harum quos eveniet quis non ipsam
              voluptate dicta qui nam quam! Corporis repellendus velit esse
              debitis ratione animi mollitia! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laborum quasi praesentium cum. Est
              nulla repellat quisquam sit, vitae consequuntur quam?`,
  },
  {
    name: "Devops Engineering",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
              delectus, accusamus beatae corporis, quidem error est esse cum
              magni quam voluptates laboriosam laudantium qui veritatis odio sed
              labore, minus voluptatem! Sit deleniti in, deserunt cum quae fuga
              adipisci, eaque error neque itaque repellat aspernatur impedit
              beatae atque nemo pariatur voluptates. Eaque impedit, ipsa autem
              tenetur totam ab expedita nobis harum quos eveniet quis non ipsam
              voluptate dicta qui nam quam! Corporis repellendus velit esse
              debitis ratione animi mollitia! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laborum quasi praesentium cum. Est
              nulla repellat quisquam sit, vitae consequuntur quam?`,
  },
];
const Experience = () => {
  return (
    <div>
      <ul>
        {experiencData.map((x) => {
          return (
            <li className="mx-2 px-5 my-10">
              <h1 className="text-xl pb-2">{x.name}</h1>
              <p>{x.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Experience;
