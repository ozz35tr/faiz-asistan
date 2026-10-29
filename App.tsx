const handleSave = async () => {
    addToLocalHistory();
    setSaveState(LoadingState.LOADING);

    try {
      await saveCalculation(data, result.netGetiri);
    } catch (e) {
      console.warn("Sunucu kaydı atlandı:", e);
    }

    setSaveState(LoadingState.SUCCESS);
    setTimeout(() => {
      setSaveState(LoadingState.IDLE);
    }, 2500);
  };
