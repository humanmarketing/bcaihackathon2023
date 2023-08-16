export const getScriptRequestBody = (channelId: number) => {
  return (
    {
        "name": "Ecommerce Copilot AI",
        "description": "Ecommerce Copilot AI - Product Recommendation",
        "html": getScriptRequestHtml(),
        "auto_uninstall": true,
        "load_method": "default",
        "location": "head",
        "visibility": "order_confirmation",
        "kind": "script_tag",
        "consent_category": "functional",
        "enabled": true,
        "channel_id": channelId
    }
  )
}

export const getScriptRequestHtml = () => {
  return (
    `<script type="text/javascript">
        (function() {
            var pf_s = document.createElement("script");
            pf_s.src = "https://humanmarketing.ngrok.io/post-purchase.js";
            document.querySelector("head").appendChild(pf_s);
        })();
    </script>
    `
  )
}