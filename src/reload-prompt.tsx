import { Component, createSignal } from "solid-js";
import { registerSW } from "virtual:pwa-register";
import styles from "./reload-prompt.module.css";

const ReloadPrompt: Component = () => {
    // replaced dynamically
    const buildDate = '__DATE__'

    const [needRefresh, setNeedRefresh] = createSignal(false)
    const [offlineReady, setOfflineReady] = createSignal(false)

    const updateServiceWorker = registerSW({
      immediate: true,
      onOfflineReady() {
        setOfflineReady(true);
      },
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onRegistered(swr) {
        console.log(`service worker registered: ${swr}`);
      },
      onRegisterError(err) {
        console.error('service worker registration error', err);
      },
    })

    const close = () => {
      setOfflineReady(false)
      setNeedRefresh(false)
    }

    return (
        <div class={styles.Container}>
            { (offlineReady() || needRefresh())
            && <div class={styles.Toast}>
              <div class={styles.Message}>
                  { offlineReady()
                      ? <span>App ready to work offline</span>
                      : <span>New content available, click on reload button to update.</span>
                  }
              </div>
                { needRefresh() && <button class={styles.ToastButton} onClick={() => updateServiceWorker(true)}>Reload</button> }
              <button class={styles.ToastButton} onClick={() => close()}>Close</button>
            </div>
            }
            <div class={styles.Date}>{buildDate}</div>
        </div>
    )
}

export default ReloadPrompt
