
### Ejercicio 1 

#### 1)

- **El componente se encarga de demasiadas tareas, transformar los datos (contacts, cities y states) y de cómo presentarlos en la interfaz, lo cual hace que el código sea difícil de mantener y extender**. Maneja tanto la visualización de la lista de contactos como la de las direcciones, esto deberia estar distribuido en componentes más chicos. Por ejemplo, un componente “ContactCard” debería encargarse de cómo se muestra cada contacto, y otro componente “AddressList” podría encargarse de mostrar la o las direcciones. 

- **La barra de navegación también está incluida en el mismo componente**. Este es otro ejemplo de falta de separación de responsabilidades, ya que la navegación debería ser responsabilidad de un componente diferente (por ejemplo, un componente “NavBar”).


- **Cuando se renderizan listas (contact y address) no se esta usando el atributo key**. Es importante agregar un atributo "key" unico a cada elemento renderizado ya que le permite a React identificar qué ítems se han cambiado, agregado o eliminado entre renderizaciones. React genera el Virtual DOM para optimizar las actualizaciones y manipulaciones del DOM. Cuando un componente cambia, React compara el Virtual DOM anterior con el nuevo y actualiza el DOM real solo donde hubo cambios. Si los elementos en una lista tienen una key única, React puede identificar rápidamente qué elementos de la lista se han cambiado, eliminado o agregado. Sin la key, React trata cada elemento de la lista como un nuevo ítem, provocando un renderizado innecesario y una actualización del DOM ineficiente

- **El componente presenta un problema de rendimiento, ya que cada vez que hay una actualización de estado que provoca un nuevo render, se repite el proceso de transformación de los datos**. Esto puede ser un problema si se maneja una gran cantidad de información o si el componente se actualiza con frecuencia. Para mejorar el rendimiento, se recomienda utilizar un hook como useMemo, que evita hacer los calculos innecesariamente

- **Falta de atributo alt en las imagenes.** Esto ayuda a la accesibilidad y tambien al SEO, quien usa el texto alt para clasificar las imágenes y mejorar la optimización en los resultados de búsqueda.

#### 2)  Codigo adjunto 


#### 3) Estructura de Componentes:

- Componentes más pequeños y reutilizables (NavBar, AddressList, ContactCard). Mejora la legibilidad, el mantenimiento y permite que cada componente maneje una tarea específica.

- Implementacion de interfaces de TypeScript (RawContact, Contact, Address, etc.). Esto reduce las posibilidades de errores en tiempo de ejecución y ayuda a los desarrolladores a entender mejor la estructura de los datos. Siendo que es una aplicacion que puede escalar en el futuro, me parece un buen enfoque pasar el codigo a TypeScript. La primera versión no tiene tipos explícitos, lo que puede llevar a errores y dificulta entender la estructura de los objetos que se están pasando.

- Uso del atributo ```key``` en listas, lo que asegura que React pueda renderizar eficientemente la lista cuando cambie.

- Uso de useMemo para optimizar los contactos procesados, lo que asegura que la operación costosa de mapeo solo se ejecute cuando cambian las entradas (contacts, cities, states). Esto mejora el rendimiento al evitar cálculos innecesarios en cada renderizado.

- Incorporacion de atributos aria-label, role y alt, mejorando la accesibilidad y cumpliendo con los estándares web. 

#### 4) 
Hice un nuevo componente porque me parecia un componente sencillo y que no valia la pena utilizar el patron Compound Components. Si necesitaria mas flexibilidad para controlar cómo se renderizan varias partes de un componente, lo hubiera utilizado. Por ejemplo, si en alguno de los components ContactProfile y ContactCard no quisiera mostrar el mail o el phone_number. En este  caso, como el propósito es simplemente mostrar la misma información de un contacto con un par de diferencias en los atributos, no sería necesario complicarlo con el patrón Compound Components.
