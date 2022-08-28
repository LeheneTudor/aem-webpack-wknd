package apps.wknd.templates.customclientlibs;

import javax.script.Bindings;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.scripting.sightly.pojo.Use;
import org.slf4j.Logger;

import com.adobe.granite.ui.clientlibs.HtmlLibraryManager;

public class WKNDClientLibUseObject implements Use {

    private static final String BINDINGS_CATEGORIES = "categories";
    private static final String BINDINGS_MODE = "mode";
    // changes-start
    private static final String CSS_LOAD_MODE = "cssLoadMode";
    private static final String CSS_LOAD_AS = "cssLoadAs";
    private static final String JS_LOAD_MODE = "jsLoadMode";
    // changes-end

    private HtmlLibraryManager htmlLibraryManager = null;
    private String[] categories;
    private String mode;
    private SlingHttpServletRequest request;
    private PrintWriter out;
    private Logger log;
    private String jsLoadModifier;
    private String cssLoadModifier;

    public void init(Bindings bindings) {
        Object categoriesObject = bindings.get(BINDINGS_CATEGORIES);

        log = (Logger) bindings.get(SlingBindings.LOG);
        if (categoriesObject != null) {
            if (categoriesObject instanceof Object[]) {
                Object[] categoriesArray = (Object[]) categoriesObject;
                categories = new String[categoriesArray.length];
                int i = 0;
                for (Object obj : categoriesArray) {
                    if (obj instanceof String) {
                        categories[i++] = ((String) obj).trim();
                    }
                }
            } else if (categoriesObject instanceof String) {
                categories = ((String) categoriesObject).split(",");
                int i = 0;
                for (String c : categories) {
                    categories[i++] = c.trim();
                }
            }
            if (categories != null && categories.length > 0) {
                mode = (String) bindings.get(BINDINGS_MODE);
                request = (SlingHttpServletRequest) bindings.get(SlingBindings.REQUEST);
                SlingScriptHelper sling = (SlingScriptHelper) bindings.get(SlingBindings.SLING);
                htmlLibraryManager = sling.getService(HtmlLibraryManager.class);
                // changes-start
                jsLoadModifier = (String) bindings.get(JS_LOAD_MODE);
                cssLoadModifier = (String) bindings.get(CSS_LOAD_MODE);
                // changes-end
            }
        }
    }

    public String include() {
        StringWriter sw = new StringWriter();
        String replaced = "";
        try {
            if (categories == null || categories.length == 0)  {
                log.error("'categories' option might be missing from the invocation of the /libs/granite/sightly/templates/clientlib.html" +
                        "client libraries template library. Please provide a CSV list or an array of categories to include.");
            } else {
                PrintWriter out = new PrintWriter(sw);
                if ("js".equalsIgnoreCase(mode)) {
                    htmlLibraryManager.writeJsInclude(request, out, categories);
                } else if ("css".equalsIgnoreCase(mode)) {
                    htmlLibraryManager.writeCssInclude(request, out, categories);
                } else {
                    htmlLibraryManager.writeIncludes(request, out, categories);
                }
                // changes-start
                replaced = sw.toString();
                if (!StringUtils.isEmpty(jsLoadModifier)) {
                    replaced = replaced.replaceAll("<script", "<script "+jsLoadModifier);
	            }
	            if (!StringUtils.isEmpty(cssLoadModifier)) {
                    replaced = replaced.replaceAll("<link rel=\"stylesheet\"", "<link rel=\""+cssLoadModifier+"\" as=\"style\"");
	            }
                // changes-end
            }
        } catch (IOException e) {
            log.error("Failed to include client libraries {}", categories);
        }
        return replaced;
    }
}
