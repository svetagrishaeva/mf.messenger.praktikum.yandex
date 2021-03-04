export const infoItemsTmpl = `
    <% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <input class="info-input" value="<%-item.value%>" id="<%-item.id%>" disabled/>
    </div>
    <% }); %>`

export const passwordItemsTmpl = `
    <% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <input class="password-input" type="password" id="<%-item.id%>"/>
    </div>
    <% }); %>`